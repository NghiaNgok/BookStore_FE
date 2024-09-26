import { FC } from "react";
import {
  Affix,
  Button,
  Card,
  Col,
  Flex,
  InputNumber,
  List,
  Row,
  Spin,
  Table,
  TableColumnsType,
  Typography,
} from "antd";

import { CartItemType } from "../../shared/constants/types/cart.type";
import { useSelector } from "react-redux";
import { userSelector } from "../../shared/redux-flow/selector";
import '../../assets/css/cart.css'

interface CartViewProps {
  data: CartItemType[] | undefined;
  totalPrice: number | undefined;
  onChangeQuantity: (value: number, item: CartItemType) => void;
  onClickRemoveCartItem: (value: string) => void;
  onClickRemoveCart: (value: string) => void;
  loading: boolean;
  onClickPlaceOrder: () => void;
}
const { Text } = Typography;
const CartView: FC<CartViewProps> = (props) => {
  const {
    data,
    onChangeQuantity,
    onClickRemoveCartItem,
    totalPrice,
    onClickRemoveCart,
    loading,
    onClickPlaceOrder,
  } = props;
  const userStore = useSelector(userSelector);

  const cartItems = data ?? [];
  const columns: TableColumnsType<CartItemType> = [
    {
      title: "Product",
      dataIndex: "book",
      key: "book",
      responsive: ["md"],
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
                      <Text delete>${item.book.price}</Text>
                      <Text strong type="danger">
                        ${item.price / item.quantity}
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
      dataIndex: "quantity",
      key: "quantity",
      render: (_, item) => (
        <InputNumber
          type="number"
          min={1}
          value={item.quantity ?? 1}
          onChange={(value) => onChangeQuantity(value as number, item)}
        />
      ),
    },
    {
      title: "Total price",
      dataIndex: "price",
      key: "price",
      render: (item) => <b style={{ color: "red" }}>$ {item}</b>,
    },

    {
      title: (
        <>
          <Button
            onClick={() => onClickRemoveCart(userStore?.id as string)}
            type="text"
            danger
            size={"small"}>
            Remove all{" "}
          </Button>
        </>
      ),
      key: "action",
      render: (_, item) => (
        <>
          <Button
            onClick={() => onClickRemoveCartItem(item.id)}
            type="text"
            danger
            size={"small"}>
            Remove
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <Spin spinning={loading} tip="Loading...">
        <span style={{ margin: "auto 0" }}>
          <b style={{ fontSize: 20 }}>Cart </b>({cartItems.length} products)
        </span>
        <hr />
        <Row gutter={[10, 10]}>
          <Col md={15} sm={24} xs={24}>
            <Table
              columns={columns}
              dataSource={cartItems}
              pagination={false}
              className="cart-pc"
            />
            <div className="cart-mobile">
              <List
                itemLayout="vertical"
                size="default"
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item
                    key={item.book.id}
                    style={{ backgroundColor: "white" }}
                    extra={
                      <img width={200} alt="logo" src={item.book.imageUrl} />
                    }>
                    <Flex gap={10} vertical style={{ margin: "0 30px" }}>
                      <b>{item.book.title}</b>
                      <span>
                        {item.book.price !== item.price / item.quantity ? (
                          <>
                            <Flex justify="flex-start" gap={10}>
                              <Text delete>${item.book.price}</Text>
                              <Text strong type="danger">
                                ${item.price / item.quantity}
                              </Text>
                            </Flex>
                          </>
                        ) : (
                          <>${item.book.price}</>
                        )}
                      </span>
                      <Flex justify="space-between" align="center">
                        <InputNumber
                          type="number"
                          min={1}
                          value={item.quantity ?? 1}
                          onChange={(value) =>
                            onChangeQuantity(value as number, item)
                          }
                        />
                        <b style={{ color: "red" }}>$ {item.price}</b>
                      </Flex>
                      <Button
                        onClick={() => onClickRemoveCartItem(item.id)}
                        type="text"
                        danger
                        size={"small"}>
                        Remove
                      </Button>
                    </Flex>
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col md={9} sm={24} xs={24} style={{ alignContent: "flex-start" }}>
            <Affix offsetTop={100}>
              <Card
                title="CART TOTAL"
                bordered={false}
                style={{ width: "100%", border: "1px, solid" }}>
                <Flex justify="space-between" align="flex-start">
                  <b>Total Price</b>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    $ {totalPrice}
                  </span>
                </Flex>
                <hr />
                <Flex
                  vertical
                  gap="small"
                  style={{ width: "100%", padding: "0 10px" }}>
                  <Button
                    disabled={cartItems.length < 1}
                    type="primary"
                    danger
                    onClick={onClickPlaceOrder}>
                    Place Order
                  </Button>
                </Flex>
              </Card>
            </Affix>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default CartView;
