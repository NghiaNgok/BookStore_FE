import {
  Select,
  ConfigProvider,
  Flex,
  Pagination,
  Empty,
  Spin,
  Row,
  Col,
} from "antd";
import React, { FC } from "react";

import CardComponent from "../../shared/components/Card";
import FilterComponent from "./filter/index";
import { IBook, BookQuery } from "../../shared/constants/types/book.type";

interface ShopViewProps {
  item: IBook[] | undefined;
  currentPage: number | undefined;
  totalItems: number | undefined;
  limit: number | undefined;
  onChangeSort: (value: string) => void;
  onChangePage: (value: number) => void;
  setFilter: (value: BookQuery) => void;
  filter: BookQuery;
  loading: boolean;
}

const contentStyle: React.CSSProperties = {
  background: "#f5f5f5",
  padding: 10,
};

const { Option } = Select;
const ShopView: FC<ShopViewProps> = (props) => {
  const {
    onChangeSort,
    item,
    currentPage,
    totalItems,
    limit,
    onChangePage,
    setFilter,
    filter,
    loading,
  } = props;
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
          padding: 5,
        },
      }}>
      <Spin spinning={loading} tip="Loading...">
        <div style={contentStyle}>
          <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 5 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}>
              <div>
                <FilterComponent filter={filter} setFilter={setFilter} />
              </div>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 19 }}
              lg={{ span: 19 }}
              xl={{ span: 19 }}>
              <div style={{padding: '5px 0'}}>
                <Flex justify="flex-end" align="center">
                  <Select
                    defaultValue="ALL"
                    style={{ width: 150, marginBottom: 20, border: "1px solid", borderRadius: 5 }}
                    onChange={onChangeSort}>
                    <Option value="ALL">All</Option>
                    <Option value="NEW">Sort by New</Option>
                    <Option value="ON_SALE"> Sort by On Sale</Option>
                  </Select>
                </Flex>
                <div style={{ minHeight: "120vh" }}>
                  <Flex wrap gap={18} justify="center" align="center">
                    {item && item.length > 0 ? (
                      item.map((book) => (
                        <CardComponent key={book.id} item={book} />
                      ))
                    ) : (
                      <Empty style={{ width: "40rem" }} />
                    )}
                  </Flex>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    background: "#fff",
                    padding: 5,
                    width: "98%",
                  }}>
                  <Pagination
                    defaultCurrent={currentPage ? currentPage : 1}
                    total={totalItems}
                    pageSize={limit}
                    onChange={onChangePage}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Spin>
    </ConfigProvider>
  );
};
export default ShopView;
