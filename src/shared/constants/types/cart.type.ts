  type Book = {
    id: string;
    price: number;
    title: string;
    imageUrl: string;
  };
  
  export type CartItemType = {
    id: string;
    price: number;
    quantity: number;
    book: Book;
  };

  export type OrderDtaileInputType  ={
    bookId: string;
    price: number;
    quantity: number;
  }
  
  export type CartStoreType = {
    items: CartItemType[];
  };

  export type UpdateCartItemType = {
    id: string;
    quantity: number;
  }

  export type AddToCartType = {
    bookId: string;
    price: number;
    quantity: number;
    userId: string;
  }