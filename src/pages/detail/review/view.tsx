import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Checkbox, Col, Flex, Form, List, Pagination, Rate, Row, Select, Progress } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../shared/redux-flow/selector";
import { AUTH_PATH } from "../../../shared/constants/path";
import { IQueryReview, ReviewType } from "../../../shared/constants/types/review";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { getAllSentiment } from "../../../shared/services/review/review.service";

const { Option } = Select;


interface ReviewViewProps {
  onFinishReview: (value: any) => void;
  setFilter: (value: IQueryReview) => void;
  data: ReviewType[] | undefined;
  onChangeRating: (checkedValues: CheckboxValueType[]) => void;
  totalItems: number | undefined;
  filter: IQueryReview;
  onChangePage: (value: number) => void;
  onChangeCategory: (value: string) => void;
  formRef: any;
  totalRate: number | undefined;
  loading: boolean;
}

const ratingOption = [
  { label: "1 sao", value: 1 },
  { label: "2 sao", value: 2 },
  { label: "3 sao", value: 3 },
  { label: "4 sao", value: 4 },
  { label: "5 sao", value: 5 },
];



const ReviewView: FC<ReviewViewProps> = (props) => {
  const {
    onFinishReview,
    onChangeRating,
    data,
    totalItems,
    filter,
    onChangePage,
    onChangeCategory,
    formRef,
    totalRate,
  } = props;

  const userStore = useSelector(userSelector);

  const [sentimentSummary, setSentimentSummary] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  useEffect(() => {
    if (filter.bookId) {
      fetchSentimentSummary(filter.bookId);
    }
  }, [filter.bookId]);

  // Fetch the sentiment summary
  const fetchSentimentSummary = async (bookId: string) => {
    try {
      const response = await getAllSentiment(bookId);
      const summary = response.data.data.getSentimentSummary;
      setSentimentSummary({
        positive: summary.positive,
        neutral: summary.neutral,
        negative: summary.negative,
      });
    } catch (error) {
      console.error("Error fetching sentiment summary:", error);
    }
  };

 // Hàm xử lý khi người dùng submit review
 const handleFinishReview = (values: any) => {
  console.log('Review submitted:', values);

  // Xử lý submit ở đây (ví dụ: gửi review lên server)
  onFinishReview(values);

  // Reset form sau khi submit
  formRef.current.resetFields();

  // Hiển thị thông báo xác nhận
};
  // Render sentiment score bars
  const renderScoreBars = (scores: { Positive: string; Neutral: string; Negative: string }) => (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontWeight: "bold", marginBottom: 10 }}>
        Đánh giá tổng thể: {scores.Positive > scores.Neutral && scores.Positive > scores.Negative ? "Tích cực" : scores.Neutral > scores.Negative ? "Trung tính" : "Tiêu cực"}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ width: 80, textAlign: 'left', paddingRight: 5 }}>Tiêu cực</span>
        <Progress percent={parseFloat(scores.Negative) * 100} showInfo={false} strokeColor="#1890ff" style={{ flex: 1, height: 8, maxWidth: 160 }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ width: 80, textAlign: 'left', paddingRight: 5 }}>Trung tính</span>
        <Progress percent={parseFloat(scores.Neutral) * 100} showInfo={false} strokeColor="#1890ff" style={{ flex: 1, height: 8, maxWidth: 160 }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ width: 80, textAlign: 'left', paddingRight: 5 }}>Tích cực</span>
        <Progress percent={parseFloat(scores.Positive) * 100} showInfo={false} strokeColor="#1890ff" style={{ flex: 1, height: 8, maxWidth: 160 }} />
      </div>
    </div>
  );

  return (
    <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
      <Col md={17} sm={24} xs={24}>
        <Card
          title="CÁC BÌNH LUẬN CỦA KHÁCH HÀNG"
          bordered={false}
          style={{ width: "100%", border: "1px, solid" }}
        >
          <Flex justify="flex-start" align="center" gap={10}>
            <Flex
              justify="flex-start"
              align="flex-start"
              vertical
              style={{ width: "20%" }}
            >
              <span>
                <span style={{ fontSize: 34, fontWeight: "bold" }}>
                  {totalRate}
                </span>
                /5
              </span>
              <Rate style={{ fontSize: 15 }} allowHalf value={totalRate} disabled />
            </Flex>

            <div style={{ width: "100%" }}>
              <Card>
                <Flex vertical gap={15}>
                  <Checkbox.Group
                    style={{
                      display: "flex",
                      padding: 5,
                    }}
                    options={ratingOption}
                    onChange={onChangeRating}
                  />
                </Flex>
              </Card>
            </div>
          </Flex>
          <hr />

          {/* Dropdown filter menu and sentiment summary */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <Select
              defaultValue="Chọn loại bình luận"
              style={{ width: 200 }}
              onChange={onChangeCategory}
            >
              <Option value="None">Tất cả</Option>
              <Option value="Chất lượng sản phẩm">Chất lượng sản phẩm</Option>
              <Option value="Dịch vụ và hỗ trợ khách hàng">Dịch vụ và hỗ trợ khách hàng</Option>
              <Option value="Giá cả và chi phí">Giá cả và chi phí</Option>
              <Option value="Vận chuyển và đóng gói">Vận chuyển và đóng gói</Option>
              <Option value="Khác">Khác</Option>
            </Select>
            <span style={{ marginLeft: 10 }}>
              ({sentimentSummary.positive} Tích cực, {sentimentSummary.neutral} Trung tính, {sentimentSummary.negative} Tiêu cực)
            </span>
          </div>

          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.user.avatar} />}
                  title={
                    <span>
                      {item.user.fullName} | {item.createdAt}
                    </span>
                  }
                  description={
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{item.content}</span>
                        <Rate style={{ fontSize: 14 }} disabled value={item.rate} />
                      </div>
                      {item.scores && renderScoreBars(item.scores)}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          <div style={{ textAlign: "center" }}>
            <Pagination
              defaultCurrent={filter.page}
              total={totalItems}
              pageSize={filter.limit}
              onChange={onChangePage}
            />
          </div>
        </Card>
      </Col>
      <Col md={7} sm={24} xs={24} style={{ alignContent: "flex-start" }}>
      <Card
      title="ĐÁNH GIÁ"
      bordered={false}
      style={{ width: "100%", border: "1px solid" }}
    >
      <Flex vertical gap="small" style={{ width: "100%", padding: "0 10px" }}>
        {userStore ? (
          <Form
            ref={formRef}
            layout="vertical"
            onFinish={handleFinishReview}
          >
            <Form.Item label="NỘI DUNG ĐÁNH GIÁ" name="content">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="rate" label="ĐÁNH GIÁ">
              <Rate />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
            >
              XÁC NHẬN 
            </Button>
          </Form>
        ) : (
          <h3 style={{ textAlign: "center" }}>
            You need <a href={AUTH_PATH.SIGNIN}>Signin</a> to write a review
          </h3>
        )}
      </Flex>
    </Card>
      </Col>
    </Row>
  );
};

export default ReviewView;
