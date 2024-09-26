/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";
import { Book, bookPromotion } from "../../shared/constants/types/book.type";
import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  InputNumber,
  Row,
  Spin,
  Typography,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ReviewComponent from "./review";
import { calculateDiscount } from "../../shared/utils/calculateTotalPrice";

interface detailViewProps {
  data: Book | undefined;
  quantity: number | undefined;
  onChangeQuantity: (value: number | null) => void;
  addToCartButton: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const infoBookStyle: React.CSSProperties = {
  padding: 10,
  width: "100%",
  height: "auto",
  border: "1px solid",
  borderRadius: 5,
  backgroundColor: "white",
};
const { Text } = Typography;
const DetailView: FC<detailViewProps> = (props) => {
  const { data, quantity, onChangeQuantity, addToCartButton, loading, setLoading } = props;
  const [expanded, setExpanded] = useState(false);

  const qty = quantity ?? 1;

  return (
    <>
      <Spin spinning={loading} tip="Loading...">
        <h1>{data?.category.name}</h1>
        <hr />
        <Row gutter={[10, 10]}>
          <Col md={17} sm={24} xs={24}>
            <Card style={infoBookStyle}>
              <Row gutter={[10, 5]}>
                <Col
                  md={9}
                  sm={24}
                  xs={24}
                  style={{ alignContent: "flex-start" }}>
                  <Flex
                    vertical
                    justify="flex-start"
                    align="flex-start"
                    gap={20}>
                    <div>
                      <Image width={200} src={data?.imageUrl} />
                    </div>

                    <div>
                      By <b>{data?.author.name}</b>
                    </div>
                    <div>
                      {data?.bookPromotion ? (
                        data.bookPromotion.length > 0 ? (
                          <Flex justify="flex-start" gap={10}>
                            <Text delete>$ {data.price}</Text>
                            <Text strong type="danger">
                              $
                              {calculateDiscount(
                                data.limitDiscount,
                                data.price,
                                data.bookPromotion
                              )}
                            </Text>
                          </Flex>
                        ) : (
                          <span>$ {data.price}</span>
                        )
                      ) : (
                        0
                      )}
                    </div>
                  </Flex>
                </Col>
                <Col md={15} sm={24} xs={24}>
                  <Flex
                    style={{ fontSize: 20 }}
                    vertical
                    justify="flex-start"
                    align="flex-start">
                    <h2>{data?.title}</h2>
                    <div>
                      <Typography.Paragraph
                        ellipsis={{
                          rows: 10,
                          expandable: "collapsible",
                          expanded,
                          onExpand: (_, info) => setExpanded(info.expanded),
                        }}
                        style={{ lineHeight: 2, fontSize: 15 }}>
                        {data?.description}
                      </Typography.Paragraph>
                    </div>
                  </Flex>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={7} sm={24} xs={24} style={{ alignContent: "flex-start" }}>
            <Card
              title="PRICE"
              bordered={false}
              style={{ width: "100%", border: "1px, solid" }}>
              <div style={{ textAlign: "center" }}>
                <InputNumber
                  size="large"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(value) => onChangeQuantity(value as number)}
                />
              </div>
              <hr />
              <Flex justify="space-between" align="flex-start">
                <b>Total Price</b>
                <span style={{ color: "red" }}>
                  $
                  {calculateDiscount(
                    data?.limitDiscount as number,
                    data?.price as number,
                    data?.bookPromotion as bookPromotion[]
                  ) * qty}
                </span>
              </Flex>
              <hr />
              <Flex
                vertical
                gap="small"
                style={{ width: "100%", padding: "0 10px" }}>
                <Button
                  type="primary"
                  onClick={addToCartButton}
                  icon={<ShoppingCartOutlined />}>
                  Add To Cart
                </Button>
              </Flex>
            </Card>
          </Col>
        </Row>
        {/* REVIEW COMPONENT */}
        <ReviewComponent
          bid={data?.id as string}
          totalRate={data?.rate as number}
          loading={loading}
          setLoading={setLoading}
        />
      </Spin>
    </>
  );
};

export default DetailView;
