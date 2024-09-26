/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ReviewView from "./view";
import {
  IQueryReview,
  IReviewInput,
  ReviewType,
} from "../../../shared/constants/types/review";
import {
  createReviewApi,
  getAllReviews,
} from "../../../shared/services/review/review.service";
import {
  errorPopUpMessage,
} from "../../../shared/components/Notification";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../shared/redux-flow/selector";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { FormInstance } from "antd";
import { fetchUpdateRate } from "../../../shared/services/book/book.service";
import { delay } from "../../../shared/utils/delay";

interface ReviewComponentProps {
  bid: string | undefined;
  totalRate: number | undefined;
  loading: boolean;
  setLoading: (value: boolean) => void;
}
const ReviewComponent: FC<ReviewComponentProps> = (props) => {
  const { bid, totalRate, loading, setLoading } = props;

  const userStore = useSelector(userSelector);
  const formRef = React.createRef<FormInstance>();

  const [listReview, setListReview] = useState<ReviewType[] | undefined>();
  const [totalItems, setTotalItems] = useState<number>();
  const [filter, setFilter] = useState<IQueryReview>({
    bookId: "",
    rate: [],
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (bid) {
      setFilter({ ...filter, bookId: bid });
    }
  }, [bid]);

  useEffect(() => {
    handleGetAllReview(filter);
  }, [filter]);

  const handleGetAllReview = async (value: IQueryReview) => {
    try {
      setLoading(true);
      await delay(1000);
      const response = await getAllReviews(value);
      if (!response.data.data) {
        return;
      }
      const result = response.data.data.getAllReview;
      setListReview(result.list);
      setTotalItems(result.totalProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateReview = async (value: IReviewInput) => {
    try {
      const result = await createReviewApi(value);
      if (!result.data.data) {
        errorPopUpMessage("Review Failed", result.data.errors[0].message);
        return;
      }
      await handleUpdateRate(result.data.data.createReview.bookId);
      await handleGetAllReview(filter);
      formRef.current?.resetFields();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateRate = async (id: string) => {
    try {
      const result = await fetchUpdateRate(id);
      if (!result.data.data) {
        errorPopUpMessage("Review Failed", result.data.errors[0].message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishReview = async (values: IReviewInput) => {
    if (!bid) {
      errorPopUpMessage("Create Review failed", "BookId not found");
      return;
    }
    setLoading(true);
    await delay(1000);
    await handleCreateReview({
      ...values,
      bookId: bid,
      userId: userStore?.id as string,
    });
  };

  const onChangeRating = (checkedValues: CheckboxValueType[]) => {
    const intValues = checkedValues.map((value) => parseInt(value as string));
    setFilter({
      ...filter,
      rate: intValues,
      page: 1,
    });
  };

  const onChangePage = (value: number) => {
    setFilter({
      ...filter,
      page: value,
    });
  };

  return (
    <ReviewView
      data={listReview}
      setFilter={setFilter}
      onFinishReview={onFinishReview}
      onChangeRating={onChangeRating}
      totalItems={totalItems}
      filter={filter}
      onChangePage={onChangePage}
      formRef={formRef}
      totalRate={totalRate}
      loading={loading}
    />
  );
};

export default ReviewComponent;
