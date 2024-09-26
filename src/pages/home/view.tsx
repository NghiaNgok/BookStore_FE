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
  const { data, setFilter, filter, featuredBook } = props;
  const navigate = useNavigate();

  const handleChangeFeatured = (val: string) => {
    if (val === "new") {
      setFilter({ ...filter, sortByEnum: SortBookByEnum.NEW });
    }
    if (val === "popular") {
      setFilter({ ...filter, sortByEnum: SortBookByEnum.POPULAR });
    }
  };

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
      <div style={contentStyle}>
        <Flex justify="space-between" align="center" gap="small">
          <img
            src="https://res.cloudinary.com/dyo7rdbmx/image/upload/v1717641347/Sale-Free-PNG-Image_bsimtf.png"
            width={100}
          />
          <Button
            onClick={onClickViewAllButton}
            style={{ width: "5rem", height: "3rem" }}
            type="link">
            View all
          </Button>
        </Flex>
        <hr />
        <Flex wrap justify="center" align="center" gap={10}>
          {data && data?.length > 0 ? (
            data?.map((item) => <CardComponent key={item.id} item={item} />)
          ) : (
            <Empty
              style={{ width: "40rem" }}
              description={<span>Sorry! No book discount now :(</span>}
            />
          )}
        </Flex>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>FEATURED BOOKS</h1>
        <Space size="large">
          <Button
            ghost={filter.sortByEnum === SortBookByEnum.NEW}
            onClick={() => handleChangeFeatured("new")}>
            New
          </Button>
          <Button
            ghost={filter.sortByEnum === SortBookByEnum.POPULAR}
            onClick={() => handleChangeFeatured("popular")}>
            Popular
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
                description={<span>Sorry! No book recomment now :(</span>}
              />
            )}
          </Flex>
        </Flex>
      </div>
    </ConfigProvider>
  );
};

export default Homeview;
