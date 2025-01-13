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

const formatToVND = (amount: number): string => {
  return `${amount.toLocaleString('vi-VN')} VNĐ`;
};

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
                      {data?.bookPromotion ? (
                        data.bookPromotion.length > 0 ? (
                          <Flex justify="flex-start" gap={10}>
                            <Text delete>{formatToVND(data.price)}</Text>
                            <Text strong type="danger">
                              {formatToVND(
                                calculateDiscount(
                                  data.limitDiscount,
                                  data.price,
                                  data.bookPromotion
                                )
                              )}
                            </Text>
                          </Flex>
                        ) : (
                          <span>{formatToVND(data.price)}</span>
                        )
                      ) : (
                        "0 VNĐ"
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
                  <div
  style={{
    display: "flex",
    flexDirection: "column", // Align blocks vertically
    alignItems: "center", // Center-align the blocks horizontally
    justifyContent: "center",
    gap: "20px", // Space between the two blocks
    marginTop: "20px", // Top margin
    width: "100%",
  }}
>
  {/* Title Block */}
  <div
    style={{
      backgroundColor: "#f8f9fa", // Light background
      padding: "20px", // Padding inside the block
      borderRadius: "10px", // Rounded edges
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
      width: "80%", // Larger width for the blocks
      display: "flex", // Flex layout for content alignment
      flexDirection: "column", // Stack label and content vertically
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
      textAlign: "center", // Center-align text inside the block
    }}
  >
    <b
      style={{
        fontSize: "20px", // Font size for the label
        color: "#457b9d", // Accent color
        marginBottom: "10px", // Spacing below the label
      }}
    >
      TÊN SẢN PHẨM:
    </b>
    <h2
      style={{
        fontSize: "28px", // Larger font for the content
        fontWeight: "bold", // Bold text
        color: "#2c3e50", // Neutral dark color
        margin: "0", // Remove default margin
      }}
    >
      {data?.title || "Product Title"}
    </h2>
  </div>

  {/* Description Block */}
  <div
    style={{
      backgroundColor: "#f8f9fa", // Light background
      padding: "20px", // Padding inside the block
      borderRadius: "10px", // Rounded edges
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
      width: "80%", // Larger width for the blocks
      display: "flex", // Flex layout for content alignment
      flexDirection: "column", // Stack label and content vertically
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
      textAlign: "center", // Center-align text inside the block
    }}
  >
    <b
      style={{
        fontSize: "20px", // Font size for the label
        color: "#457b9d", // Accent color
        marginBottom: "10px", // Spacing below the label
      }}
    >
      MÔ TẢ SẢN PHẨM:
    </b>
    <Typography.Paragraph
      style={{
        fontSize: "16px", // Text font size
        color: "#2c3e50", // Neutral text color
        lineHeight: "1.8", // Line spacing for readability
        margin: "0", // Remove unnecessary margin
      }}
    >
      {data?.description || "No description available."}
    </Typography.Paragraph>
  </div>
</div>

                  </Flex>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={7} sm={24} xs={24} style={{ alignContent: "flex-start" }}>
            <Card
              title="GIÁ BÁN"
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
                <b>THÀNH TIỀN</b>
                <span style={{ color: "red" }}>
                  {formatToVND(
                    calculateDiscount(
                      data?.limitDiscount as number,
                      data?.price as number,
                      data?.bookPromotion as bookPromotion[]
                    ) * qty
                  )}
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
                  Thêm vào giỏ hàng
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
