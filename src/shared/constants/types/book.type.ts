export interface IBook {
  id: string;
  title: string;
  rate: number;
  price: number;
  imageUrl: string;
  isOutofStock: boolean;
  categoryId: string;
  authorId: string;
  limitDiscount: number;
  bookPromotion: bookPromotion[];
}

export interface IBooks {
  findAllBooks: {
    list: [IBook];
    currentPage: number;
    totalProducts: number;
    limit: number;
  };
}

export type bookPromotion = {
  promotion: {
    discountPercents: number;
  };
};

export enum SortBookByEnum {
  ON_SALE = "ON_SALE",
  POPULAR = "POPULAR",
  RECOMMENDED = "RECOMMENDED",
  NEW = "NEW"
}

export type BookQuery = {
  title?: string;
  rate?: number[];
  author?: string[];
  category?: string[];
  sortByEnum?: SortBookByEnum;
  page?: number;
  limit?: number;
};

export type Book = {
  id: string;
  title: string;
  rate: number;
  price: number;
  imageUrl: string;
  description: string;
  isOutofStock: boolean;
  limitDiscount: number;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
  };
  bookPromotion: bookPromotion[];
};

export type BookInputList = {
  id: string;
};
