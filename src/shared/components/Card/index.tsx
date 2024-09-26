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
  width: "12rem",
  borderRadius: 0,
  padding: "10px",
  overflow: "hidden",
};

const { Meta } = Card;
const { Text } = Typography;

const CardComponent: React.FC<CardComponentProps> = (props) => {
  const { item } = props;
  const navigate = useNavigate();

  const onClickDetail = () => {
    localStorage.setItem(PRODUCT_ID, item.id);
    navigate(CUSTOMER_PATH.DETAIL_PRODUCT);
  };

  return (
    <Card
      onClick={onClickDetail}
      hoverable
      style={cardStyle}
      cover={
        <div style={{ width: "100%", height: "178px", textAlign: "center" }}>
          <img
            style={{ borderRadius: 0, height: "100%", objectFit: "cover" }}
            alt="example"
            src={item.imageUrl}
          />
        </div>
      }>
      <Flex vertical align="start" style={{ lineHeight: 2 }}>
        <Rate disabled value={item.rate} style={{ fontSize: 15 }} />
        <Meta title={item.title} />
        {item.bookPromotion.length > 0 ? (
          <Flex justify="flex-start" gap={10}>
            <Text delete>${item.price}</Text>
            <Text strong type="danger">
              $
              {calculateDiscount(
                item.limitDiscount,
                item.price,
                item.bookPromotion
              )}
            </Text>
          </Flex>
        ) : (
          <span>${item.price}</span>
        )}
      </Flex>
    </Card>
  );
};

export default CardComponent;
