import {
  Card,
  Col,
  Flex,
  Modal,
  Row,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import { CartItemType } from "../../../../../shared/constants/types/cart.type";
import { IOrderDetail } from "../../../../../shared/constants/types/order.type";
import { getDetailOrder } from "../../../../../shared/services/order/order.service";
import {
  errorPopUpMessage,
  successPopUpMessage,
} from "../../../../../shared/components/Notification";
import ShowStatusComponent from "../../../../../shared/components/Status";

interface DetailModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  orderId: string | undefined;
}

const { Text } = Typography;
const containerStle: React.CSSProperties = {
  height: "auto",
  overflow: "auto",
  padding: "0 16px",
  border: "1px solid rgba(140, 140, 140, 0.35)",
  borderRadius: 0,
  lineHeight: 3,
};

const columns: TableColumnsType<CartItemType> = [
  {
    title: "Product",
    responsive: ["md"],
    width: 300,
    render: (_, item) => (
      <>
        <Flex justify="flex-start" align="flex-start">
          <div style={{ width: "auto", height: "100px", textAlign: "left" }}>
            <img
              style={{ borderRadius: 0, height: "100%", objectFit: "cover" }}
              alt="example"
              src={item.book.imageUrl}
            />
          </div>

          <Flex
            style={{ height: 100, marginLeft: 10 }}
            vertical
            justify="center"
            align="flex-start">
            <span>{item.book.title}</span>
            <span>
              {item.book.price !== item.price / item.quantity ? (
                <>
                  <Flex justify="flex-start" gap={10}>
                    <Text delete>$ {item.book.price}</Text>
                    <Text strong type="danger">
                      ${item.price}
                    </Text>
                  </Flex>
                </>
              ) : (
                <>${item.book.price}</>
              )}
            </span>
          </Flex>
        </Flex>
      </>
    ),
  },
  {
    title: "Quantity",
    width: 75,
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Total price",
    width: 75,
    dataIndex: "price",
    key: "price",
    render: (item) => <b style={{ color: "red" }}>$ {item}</b>,
  },
];

const DetailModal: FC<DetailModalProps> = (props) => {
  const { open, setOpen, orderId } = props;
  const [detailOrder, setDetailOrder] = useState<IOrderDetail>();

  useEffect(() => {
    if (orderId) {
      handleGetDetailOrder(orderId);
    }
  }, [orderId]);

  const handleGetDetailOrder = async (id: string) => {
    try {
      const result = await getDetailOrder(id);
      if (!result.data.data) {
        errorPopUpMessage("Failed to get detail order", "");
        return;
      }
      setDetailOrder(result.data.data.getOrderDetail);
      successPopUpMessage("Get Detail Order success");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Modal
        title="ORDER DETAIL"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1200}>
        <Row gutter={[10, 10]}>
          <Col md={15} sm={24} xs={24}>
            <Table
              scroll={{ y: 240 }}
              columns={columns}
              dataSource={detailOrder?.OrderDetail}
              pagination={false}
            />
          </Col>
          <Col md={9} sm={24} xs={24} style={{ alignContent: "flex-start" }}>
            <Card
              title="ORDER INFOMATION"
              bordered={false}
              style={containerStle}>
              <Flex justify="space-between" align="flex-start">
                <b>Customer Name</b>
                <span>{detailOrder?.customerName}</span>
              </Flex>
              <Flex justify="space-between" align="flex-start">
                <b>Phone Number</b>
                <span>{detailOrder?.phoneNumber}</span>
              </Flex>
              <Flex justify="space-between" align="flex-start">
                <b>Address</b>
                <span>{detailOrder?.address}</span>
              </Flex>
              <Flex justify="space-between" align="flex-start">
                <b>Payment Method</b>
                <span>{detailOrder?.paymentMethod}</span>
              </Flex>
              <Flex justify="space-between" align="flex-start">
                <b>Total Price</b>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  $ {detailOrder?.totalPrice}
                </span>
              </Flex>
              <Flex justify="space-between" align="center">
                <b>Status</b>
                <ShowStatusComponent status={detailOrder?.status} />
              </Flex>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DetailModal;
