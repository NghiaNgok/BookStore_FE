import {
  AddToCartType,
  UpdateCartItemType,
} from "../../constants/types/cart.type";

export const allCartItemQuery = (uid: string) => {
  return {
    operationName: "GetCart",
    query: `
      query GetCart($uid: String!) {
        getCart(uid: $uid) {
            id
            price
            quantity
            book {
                id
                price
                title
                imageUrl
                bookPromotion {
                  promotion {
                      discountPercents
                  }
                }
            }
        }
      }         
        `,
    variables: { uid: uid },
  };
};

export const updateCart = (data: UpdateCartItemType) => {
  return {
    operationName: "UpdateCart",
    query: `
      mutation UpdateCart($id: String!, $quantity: Int!) {
        updateCart(id: $id, quantity: $quantity) {
          id
          price
          quantity
          book {
              id
              price
              title
              imageUrl
          }
        }
      }
        `,
    variables: data,
  };
};

export const removeCartItem = (id: string) => {
  return {
    operationName: "RemoveCart",
    query: `
      mutation RemoveCart($id: String!) {
        removeCart(id: $id) {
            id
        }
      }
        `,
    variables: { id: id },
  };
};
export const removeAllCartItem = (id: string) => {
  return {
    operationName: "DeleteAllCart",
    query: `
    mutation DeleteAllCart($uid: String!) {
      deleteAllCart(uid: $uid)
  }
  
        `,
    variables: { uid: id },
  };
};

export const addToCart = (data: AddToCartType) => {
  return {
    operationName: "AddToCart",
    query: `
      mutation AddToCart($bookId: String!, $price: Float!, $quantity: Int!, $userId: String!) {
        addToCart(
            bookId: $bookId
            price: $price
            quantity: $quantity
            userId: $userId
        ) {
            id
            price
            quantity
            book {
                id
                imageUrl
                price
                title
                bookPromotion {
                  promotion {
                      discountPercents
                  }
              }
            }
        }
      }
    
        `,
    variables: data,
  };
};
