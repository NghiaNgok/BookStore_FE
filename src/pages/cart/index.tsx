/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";

import CartView from "./view";
import { cartSelector } from "../../shared/redux-flow/selector";
import {
  CartItemType,
  UpdateCartItemType,
} from "../../shared/constants/types/cart.type";
import {
  deleteCartItem,
  removeCurrentCart,
  updateCartItem,
} from "../../shared/services/cart/cart.service";
import {
  handleRemoveCart,
  handleStoreCart,
} from "../../shared/redux-flow/action";
import {
  errorPopUpMessage,
  successPopUpMessage,
} from "../../shared/components/Notification";
import { useEffect, useState } from "react";
import { calculateTotalPrice } from "../../shared/utils/calculateTotalPrice";
import { PopUpConfirm } from "../../shared/components/Confirm";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_PATH } from "../../shared/constants/path";

const CartPage = () => {
  const cartStore = useSelector(cartSelector);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartStore) {
      setTotalPrice(calculateTotalPrice(cartStore));
    }
  }, [cartStore]);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const updateQuantity = async (value: UpdateCartItemType) => {
    try {
      const response = await updateCartItem(value);
      const updatedItem = response.data.data.updateCart;
      // Update Store
      const updatedCart: CartItemType[] = cartStore
        ? cartStore?.map((item) =>
            item.id === updatedItem.id
              ? {
                  ...item,
                  quantity: updatedItem.quantity,
                  price: updatedItem.price,
                }
              : item
          )
        : [];
      dispatch(handleStoreCart(updatedCart));
    } catch (error) {
      errorPopUpMessage("Update Cart item failed", "");
      console.error("Error updating quantity:", error);
    }
  };

  const removeCartItem = async (cid: string) => {
    try {
      await delay(1000);
      const response = await deleteCartItem(cid);
      const deletedItem = response.data.data.removeCart;
      // Update Store
      const updatedCart: CartItemType[] = cartStore
        ? cartStore.filter((item) => item.id !== deletedItem.id)
        : [];
      dispatch(handleStoreCart(updatedCart));
      successPopUpMessage("Delete Cart item successfully");
    } catch (error) {
      errorPopUpMessage("Remove Cart item failed", "");
      console.log("Error removing", error);
    }
  };

  const removeAllCartItem = async (uid: string) => {
    try {
      await delay(1000);
      const response = await removeCurrentCart(uid);
      if (response.data.data.deleteAllCart > 0) {
        dispatch(handleRemoveCart());
        successPopUpMessage("Delete Cart successfully");
      }
    } catch (error) {
      errorPopUpMessage("Remove Cart failed", "");
      console.log("Error removing", error);
    }
  };

  const onChangeQuantity = async (value: number, item: CartItemType) => {
    setLoading(true);
    await delay(1000);
    await updateQuantity({ id: item.id, quantity: value });
    setLoading(false);
  };

  const onClickRemoveCartItem = async (cartId: string) => {
    PopUpConfirm("Remove this item ?", () => removeCartItem(cartId));
  };

  const onClickRemoveCart = async (uid: string) => {
    PopUpConfirm("Remove all item ?", () => removeAllCartItem(uid));
  };

  const onClickPlaceOrder = async () => {
    setLoading(true);
    await delay(1000);
    setLoading(false);
    navigate(CUSTOMER_PATH.ORDER);
  }

  return (
    <CartView
      data={cartStore}
      totalPrice={totalPrice}
      onChangeQuantity={onChangeQuantity}
      onClickRemoveCartItem={onClickRemoveCartItem}
      onClickRemoveCart={onClickRemoveCart}
      loading={loading}
      onClickPlaceOrder={onClickPlaceOrder}
    />
  );
};

export default CartPage;
