import { FC, useEffect, useState } from "react";
import OrderComponentView from "./view";
import {
  IOrderList,
  IOrderQuery,
} from "../../../../shared/constants/types/order.type";
import { getOrderForCurrentUser } from "../../../../shared/services/order/order.service";
import { errorPopUpMessage } from "../../../../shared/components/Notification";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../shared/redux-flow/selector";

const OrderComponent: FC = () => {
  const userStore = useSelector(userSelector);
  const [listOrder, setListOrder] = useState<IOrderList[]>([]);
  const [filter, setFilter] = useState<IOrderQuery>({
    page: 1,
    limit: 5,
    userId: userStore?.id as string,
  });
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userStore) {
      getOrderList();
    }
  }, [userStore]);

  const getOrderList = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const result = await getOrderForCurrentUser(filter);
      if (!result.data.data) {
        errorPopUpMessage("Failed to get order list", "");
        setLoading(false);
        return;
      }
      const newOrders = result.data.data.getOrder;
      setListOrder((prevOrders) => [...prevOrders, ...newOrders]);
      if (filter.page === 1 && newOrders.length < 5) {
        setHasMore(false);
      } else {
        setHasMore(newOrders.length > 0);
      }

      setFilter((prevFilter) => ({ ...prevFilter, page: prevFilter.page + 1 }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <OrderComponentView
      listOrder={listOrder}
      getOrderList={getOrderList}
      hasMore={hasMore}
    />
  );
};

export default OrderComponent;
