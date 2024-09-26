import { IQueryReview, IReviewInput } from "../../constants/types/review";
import { apiBase } from "../apiBase";
import { createReview, getReview } from "./review.query";

export const createReviewApi = (data: IReviewInput) => apiBase(createReview(data));
export const getAllReviews = (data: IQueryReview) => apiBase(getReview(data));

