import { forgetCache } from "@apollo/client/cache/inmemory/reactiveVars";
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
    query GetAllReview($limit: Int, $page: Int, $bookId: String!, $rate: [Int!],  $category: String! ) {
        getAllReview(
            limit: $limit
            page: $page
            bookId: $bookId
            rate: $rate
            category: $category
        ) {
            currentPage
            limit
            totalPages
            totalProducts
            list {
                bookId
                category
                content
                createdAt
                id
                rate
                category
                user {
                    fullName
                    avatar
                }
                overallSentiment
                scores {
                Negative
                Neutral
                Positive
            }
            }
        }
    }
    
          `,
    variables: data,
  };
};

export const getSentimentSummary = (bookId: string) => {
    return {
      operationName: "GetSentimentSummary",
      query: `
        query GetSentimentSummary($bookId: String!) {
          getSentimentSummary(bookId: $bookId) {
            positive
            neutral
            negative
          }
        }
      `,
      variables: { bookId },
    };
  };
  
