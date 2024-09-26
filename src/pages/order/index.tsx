/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import OrderView from "./view";
import { IOrderCreate } from "../../shared/constants/types/order.type";
import { placeOrder } from "../../shared/services/order/order.service";
import {
  errorPopUpMessage,
  successPopUpMessage,
} from "../../shared/components/Notification";
import { removeCurrentCart } from "../../shared/services/cart/cart.service";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_PATH, SUCCESS_PATH } from "../../shared/constants/path";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveCart } from "../../shared/redux-flow/action";
import { cartSelector } from "../../shared/redux-flow/selector";

const OrderPage = () => {
  const [orderValue, setOrderValue] = useState<IOrderCreate>();
  const [loading, setLoading] = useState<boolean>(false);
  const cartStorage = useSelector(cartSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderValue) {
      handleCreateOrder(orderValue);
    }
  }, [orderValue]);

  useEffect(() => {
    if (cartStorage && cartStorage.length < 1) {
      navigate(CUSTOMER_PATH.CART);
    }
  }, [cartStorage]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleCreateOrder = async (value: IOrderCreate) => {
    try {
      setLoading(true);
      await delay(1000);
      const response = await placeOrder(value);
      const result = response.data;
      if (!result.data) {
        errorPopUpMessage("Order created Failed", result.errors[0].message);
        return;
      }
      await deleteCart(result.data.createOrder.userId);
      successPopUpMessage("Order created Successful");
      setLoading(false);
      navigate(SUCCESS_PATH.ORDER_SUCCESS);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCart = async (uid: string) => {
    try {
      const response = await removeCurrentCart(uid);
      if (response.data.data.deleteAllCart > 0) {
        dispatch(handleRemoveCart());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <OrderView setOrderValue={setOrderValue} loading={loading} />;
};

export default OrderPage;
