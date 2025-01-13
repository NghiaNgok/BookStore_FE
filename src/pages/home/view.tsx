import { Button, ConfigProvider, Empty, Flex, Space } from "antd";
import React, { FC } from "react";

import CardComponent from "../../shared/components/Card";
import {
  BookQuery,
  IBook,
  SortBookByEnum,
} from "../../shared/constants/types/book.type";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_PATH } from "../../shared/constants/path";

interface HomeViewProps {
  data: IBook[] | undefined;
  featuredBook: IBook[] | undefined;
  filter: BookQuery;
  setFilter: (value: BookQuery) => void;
  handleChangeFeatured: (val: string) => void;  // Nhận prop handleChangeFeatured
}

const contentStyle: React.CSSProperties = {
  height: "auto",
  lineHeight: "160px",
  textAlign: "center",
  background: "#fff",
  marginTop: "10px",
  padding: "10px",
};

const Homeview: FC<HomeViewProps> = (props) => {
  const { data, setFilter, filter, featuredBook, handleChangeFeatured } = props;
  const navigate = useNavigate();

  const onClickViewAllButton = () => {
    navigate(CUSTOMER_PATH.SHOP);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            titleMarginTop: 0,
            titleMarginBottom: 10,
          },
        },
        token: {
          padding: 10,
        },
      }}>
      <div style={{ textAlign: "center" }}>
        <h1>CÁC SẢN PHẨM NỔI BẬT</h1>
        <Space size="large">
          <Button
            ghost={filter.sortByEnum === SortBookByEnum.NEW}
            onClick={() => handleChangeFeatured("new")}>
            Mới
          </Button>
          
        </Space>
      </div>
      <div style={contentStyle}>
        <Flex wrap justify="center" align="center" gap={10}>
          <Flex wrap justify="center" align="center" gap={10}>
            {featuredBook && featuredBook?.length > 0 ? (
              featuredBook?.map((item) => (
                <CardComponent key={item.id} item={item} />
              ))
            ) : (
              <Empty
                style={{ width: "40rem" }}
                description="Xin lỗi! không có sản phẩm nào phổ biến bây giờ :("
              />
            )}
          </Flex>
        </Flex>
      </div>
    </ConfigProvider>
  );
};

export default Homeview;
