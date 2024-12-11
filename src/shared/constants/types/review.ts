export type ReviewType = {
  id: string;
  content: string;
  rate: number;
  createdAt: string;
  user: {
    fullName: string;
    avatar: string;
  }
  category: string;
  overallSentiment: string;
  scores: {
          Negative: string;
          Neutral: string;
          Positive: string;
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
  category?: string; // Added category as an optional property
}

export interface IResponseReview {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalProducts: number;
  list: [ReviewType];
}
