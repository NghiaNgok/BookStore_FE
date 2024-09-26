/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DetailView from "./view";
import { PRODUCT_ID } from "../../shared/constants/appConstants";
import { Book } from "../../shared/constants/types/book.type";
import { fetchOneBook } from "../../shared/services/book/book.service";
import {
  errorPopUpMessage,
  successPopUpMessage,
} from "../../shared/components/Notification";
import { cartSelector, userSelector } from "../../shared/redux-flow/selector";
import { AUTH_PATH } from "../../shared/constants/path";
import { addCartItem } from "../../shared/services/cart/cart.service";
import { CartItemType } from "../../shared/constants/types/cart.type";
import { handleStoreCart } from "../../shared/redux-flow/action";
import { calculateDiscount } from "../../shared/utils/calculateTotalPrice";

const DetailPage = () => {
  const productId = localStorage.getItem(PRODUCT_ID);
  const userStore = useSelector(userSelector);
  const cartStore = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState<Book>();
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (productId) {
      loadDetail(productId);
    }
  }, [loading]);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const loadDetail = async (id: string) => {
    await fetchOneBook(id)
      .then((rs) => {
        setProductDetail(rs?.data.data.getDetailBook);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addToCartButton = async () => {
    setLoading(true);
    if (!userStore) {
      errorPopUpMessage("Add to cart failed", "Signin required");
      navigate(AUTH_PATH.SIGNIN);
    } else {
      if (!productDetail) {
        errorPopUpMessage("Add to cart failed", "Cannot find product ");
        return;
      }
      const actualPrice = calculateDiscount(
        productDetail.limitDiscount,
        productDetail.price,
        productDetail.bookPromotion
      );
      await delay(1000);
      const result = await addCartItem({
        bookId: productDetail?.id,
        price:
          actualPrice > 0
            ? actualPrice * quantity
            : productDetail.price * quantity,
        quantity: quantity,
        userId: userStore.id,
      });
      if (!result.data.data) {
        errorPopUpMessage("Add to cart failed", result.data.errors[0].message);
        return;
      }
      const response = result.data.data.addToCart;
      if (cartStore) {
        const updatedCart: CartItemType[] = cartStore
          ? cartStore?.map((item) =>
              item.id === response.id
                ? {
                    ...item,
                    quantity: response.quantity,
                    price: response.price,
                  }
                : item
            )
          : [];
        // If the item was not found in the cart, add the new item to the cart
        if (!updatedCart.find((cartItem) => cartItem.id === response.id)) {
          updatedCart.push(response);
        }
        dispatch(handleStoreCart(updatedCart));
        setLoading(false);
        successPopUpMessage("Added To Cart");
      } else {
        errorPopUpMessage("Add to cart failed", "Could not find cart");
      }
      await addCartItem({
        bookId: productDetail?.id,
        price:
          actualPrice > 0
            ? actualPrice * quantity
            : productDetail.price * quantity,
        quantity: quantity,
        userId: userStore.id,
      });
    }
  };

  const onChange = (value: number | null) => {
    setQuantity(value as number);
  };
  return (
    <>
      <DetailView
        data={productDetail}
        quantity={quantity}
        onChangeQuantity={onChange}
        addToCartButton={addToCartButton}
        loading={loading}
        setLoading={setLoading}
      />
      ;
    </>
  );
};

export default DetailPage;
