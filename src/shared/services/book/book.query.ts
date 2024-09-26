import { BookQuery } from "../../constants/types/book.type";

export const getAllBook = (data?: BookQuery) => {
  return {
    operationName: "FindAllBooks",
    query: `query FindAllBooks(
      $author: [String!],
      $category: [String!],
      $sortByEnum: String,
      $limit: Int,
      $page: Int,
      $rate: [Int!],
      $title: String) {
      findAllBooks(
        author: $author,
        category: $category,
        sortByEnum: $sortByEnum,
        limit: $limit,
        page: $page,
        rate: $rate,
        title: $title) {
        currentPage
        limit
        totalPages
        totalProducts
        list {
          id
          imageUrl
          price
          title
          rate
          limitDiscount
          bookPromotion {
            promotion {
                discountPercents
            }
          }
        }
      }
    }
      `,
    variables: data || ({} as BookQuery),
  };
};

export const getDetailBook = (id: string) => {
  return {
    operationName: "GetDetailBook",
    query: `
    query GetDetailBook($id: String!) {
      getDetailBook(id: $id) {
          id
          imageUrl
          isOutofStock
          price
          rate
          title
          description
          limitDiscount
          bookPromotion {
            promotion {
                discountPercents
            }
          }
          category {
              id
              name
          }
          author {
              id
              name
          }
      }
    }
  
      `,
    variables: {id: id},
  };
};

export const updateRate = (id: string) => {
  return {
    operationName: "UpdateBookRating",
    query: `
    mutation UpdateBookRating($id: String!) {
      updateBookRating(id: $id) {
          rate
      }
  }
      `,
    variables: {id: id},
  };
};
