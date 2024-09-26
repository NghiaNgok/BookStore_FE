import { IQueryReview, IReviewInput } from "../../constants/types/review";

export const createReview = (data: IReviewInput) => {
  return {
    operationName: "CreateReview",
    query: `
    mutation CreateReview(
        $bookId: String!,
        $userId: String!,
        $content: String!,
        $rate: Int!
    ) {
        createReview(
            bookId: $bookId
            content: $content
            rate: $rate
            userId: $userId
        ) {
            bookId
            content
            createdAt
            id
            rate
            updatedAt
            userId
        }
    }
    
        `,
    variables: data,
  };
};

export const getReview = (data: IQueryReview) => {
  return {
    operationName: "GetAllReview",
    query: `
    query GetAllReview($limit: Int, $page: Int, $bookId: String!, $rate: [Int!]) {
        getAllReview(
            limit: $limit
            page: $page
            bookId: $bookId
            rate: $rate
        ) {
            currentPage
            limit
            totalPages
            totalProducts
            list {
                content
                createdAt
                id
                rate
                user {
                    fullName
                    avatar
                }
            }
        }
    }
    
          `,
    variables: data,
  };
};
