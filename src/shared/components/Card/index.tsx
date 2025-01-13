import React from "react";
import { Card, Flex, Rate, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { CUSTOMER_PATH } from "../../constants/path";
import { IBook } from "../../constants/types/book.type";
import { PRODUCT_ID } from "../../constants/appConstants";
import { calculateDiscount } from "../../utils/calculateTotalPrice";

interface CardComponentProps {
  item: IBook;
}

const cardStyle: React.CSSProperties = {
  width: "13rem", // Chiều rộng cố định của card
  minHeight: "300px", // Chiều cao tối thiểu của card
  borderRadius: "8px", // Bo góc card
  padding: "10px",
  overflow: "hidden",
  textAlign: "left",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Thêm bóng đổ
  backgroundColor: "#fff", // Nền trắng
};

const { Meta } = Card;
const { Text } = Typography;

// Utility function to format prices in VNĐ
const formatToVND = (amount: number) => {
  if (isNaN(amount)) return "";
  return amount.toLocaleString("vi-VN", { style: "decimal" }) + " VNĐ";
};

const CardComponent: React.FC<CardComponentProps> = (props) => {
  const { item } = props;
  const navigate = useNavigate();

  const onClickDetail = () => {
    localStorage.setItem(PRODUCT_ID, item.id);
    navigate(CUSTOMER_PATH.DETAIL_PRODUCT);
  };

  const discountedPrice = item.bookPromotion.length
    ? calculateDiscount(item.limitDiscount, item.price, item.bookPromotion)
    : item.price;

  return (
    <Card
      onClick={onClickDetail}
      hoverable
      style={cardStyle}
      cover={
        <div style={{ width: "100%", height: "180px", textAlign: "center" }}>
          <img
            style={{
              borderRadius: "8px",
              height: "100%",
              objectFit: "contain", // Đảm bảo ảnh không bị cắt hoặc méo
              marginBottom: "10px",
            }}
            alt="example"
            src={item.imageUrl}
          />
        </div>
      }
    >
      <Flex vertical align="start" style={{ lineHeight: "1.5", gap: "10px" }}>
        <Rate
          disabled
          value={item.rate}
          style={{
            fontSize: 15,
            marginBottom: "8px", // Thêm khoảng cách với tên sản phẩm
          }}
        />
        <Meta
          title={
            <Text
              style={{
                display: "-webkit-box", // Hiển thị theo dạng khối hộp
                WebkitLineClamp: 3, // Giới hạn tối đa 3 dòng
                WebkitBoxOrient: "vertical", // Cắt nội dung theo chiều dọc
                overflow: "hidden", // Ẩn phần văn bản dư thừa
                textOverflow: "ellipsis", // Thêm dấu "..." nếu tên dài hơn
                fontSize: "14px", // Kích thước chữ
                fontWeight: 500, // Độ đậm chữ
                marginBottom: "8px", // Thêm khoảng cách dưới tiêu đề
                lineHeight: "1.2em", // Tăng khoảng cách giữa các dòng
                whiteSpace: "normal", // Cho phép xuống dòng nếu cần
                maxHeight: "3.6em", // Cố định chiều cao (3 dòng)
                height: "3.6em", // Cố định chiều cao tối đa của tiêu đề
              }}
            >
              {item.title}
            </Text>
          }
        />
        {item.bookPromotion.length > 0 ? (
          <Flex justify="flex-start" gap={10}>
            <Text
              delete
              style={{
                color: "#999", // Màu xám cho giá cũ
                fontSize: "13px",
              }}
            >
              {formatToVND(item.price)}
            </Text>
            <Text
              strong
              type="danger"
              style={{
                fontSize: "14px",
              }}
            >
              {formatToVND(discountedPrice)}
            </Text>
          </Flex>
        ) : (
          <Text
            style={{
              fontSize: "14px",
              fontWeight: 600, // Làm đậm giá sản phẩm
            }}
          >
            {formatToVND(item.price)}
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default CardComponent;
