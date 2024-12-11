import { Card, Col, Flex, List, Row } from "antd";
import { useSelector } from "react-redux";
import { cartSelector } from "../../../../shared/redux-flow/selector";
import { OrderType } from "../../../../shared/constants/types/order.type";
import { FC } from "react";

const containerStyle: React.CSSProperties = {
  height: "auto",
  overflow: "auto",
  padding: "0 16px",
  border: "1px solid rgba(140, 140, 140, 0.35)",
  borderRadius: 0,
  lineHeight: 3,
};

interface FinishFormProps {
  value: OrderType;
}

// Utility function to format prices
const formatToVND = (amount: number): string => {
  return `${amount.toLocaleString("vi-VN")} VNĐ`;
};

const FinishForm: FC<FinishFormProps> = (props) => {
  const { value } = props;
  const cartStore = useSelector(cartSelector);

  const cartItems = cartStore ?? [];
  return (
    <Row gutter={[10, 10]} style={{ width: "100%" }}>
      {/* Cart Items */}
      <Col md={12} sm={24} xs={24}>
        <div id="scrollableDiv" style={containerStyle}>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`${item.book.title} (x${item.quantity})`}
                  description={formatToVND(item.book.price)}
                />
                <div style={{ color: "red" }}>{formatToVND(item.price)}</div>
              </List.Item>
            )}
          />
        </div>
      </Col>

      {/* Order Information */}
      <Col md={12} sm={24} xs={24} style={{ alignContent: "flex-start" }}>
        <Card title="ORDER INFORMATION" bordered={false} style={containerStyle}>
          <Flex justify="space-between" align="flex-start">
            <b>Customer Name</b>
            <span>{value.customerName}</span>
          </Flex>
          <Flex justify="space-between" align="flex-start">
            <b>Phone Number</b>
            <span>{value.phoneNumber}</span>
          </Flex>
          <Flex justify="space-between" align="flex-start">
            <b>Address</b>
            <span>{value.address}</span>
          </Flex>
          <Flex justify="space-between" align="flex-start">
            <b>Payment Method</b>
            <span>{value.paymentMethod}</span>
          </Flex>
          <Flex justify="space-between" align="flex-start">
            <b>Total Price</b>
            <span style={{ color: "red", fontWeight: "bold" }}>
              {formatToVND(value.totalPrice)}
            </span>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default FinishForm;
