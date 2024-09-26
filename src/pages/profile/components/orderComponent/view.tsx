/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, List, Skeleton } from "antd";
import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IOrderList } from "../../../../shared/constants/types/order.type";
import ShowStatusComponent from "../../../../shared/components/Status";
import DetailModal from "./detail";

interface OrderComponentViewProps {
  listOrder: IOrderList[] | undefined;
  getOrderList: () => void;
  hasMore: boolean;
}

const OrderComponentView: FC<OrderComponentViewProps> = (props) => {
  const { listOrder, getOrderList, hasMore } = props;
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>();
  const onClickOpneModal = (value: string) => {
    setOpenDetail(true);
    setOrderId(value);
  }
  return (
    <>
      <h3>ORDERS</h3>
      <hr />
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
        }}>
        <InfiniteScroll
          dataLength={listOrder?.length || 0}
          next={getOrderList}
          hasMore={hasMore}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv">
          <List
            dataSource={listOrder}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={<Button onClick={() => onClickOpneModal(item.id)} style={{marginLeft: -15, color: 'black', fontWeight: 'bold'}} type="link">{item.id}</Button>}
                  description={
                    <span>
                      <b style={{ color: "red" }}>${item.totalPrice}</b> |{" "}
                      {item.createdAt}
                    </span>
                  }
                />
                <ShowStatusComponent status={item.status} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <DetailModal open={openDetail} setOpen={setOpenDetail} orderId={orderId}/>
    </>
  );
};

export default OrderComponentView;
