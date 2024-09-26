export type ReviewType = {
  id: string;
  content: string;
  rate: number;
  createdAt: string;
  user: {
    fullName: string;
    avatar: string;
  }
};

export interface IReviewInput {
  content: string;
  rate: string;
  userId: string;
  bookId: string;
}

export interface IQueryReview {
  bookId: string | null;
  rate?: number[];
  page?: number;
  limit?: number;
}

export interface IResponseReview {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalProducts: number;
  list: [ReviewType];
}
