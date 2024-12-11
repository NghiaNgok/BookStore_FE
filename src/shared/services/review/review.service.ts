import { IQueryReview, IReviewInput } from "../../constants/types/review";
import { apiBase } from "../apiBase";
import { createReview, getReview, getSentimentSummary } from "./review.query";

export const createReviewApi = (data: IReviewInput) => apiBase(createReview(data));
export const getAllReviews = (data: IQueryReview) => apiBase(getReview(data));
export const getAllSentiment = (bookId: string) => apiBase(getSentimentSummary(bookId));

