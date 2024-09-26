import React, { useEffect, useState } from "react";

import { fetchAllBooks } from "../../shared/services/book/book.service.ts";

import ShopView from "./view";
import {
  BookQuery,
  SortBookByEnum,
} from "../../shared/constants/types/book.type.ts";
import { errorPopUpMessage } from "../../shared/components/Notification/index.tsx";

const ShopPage: React.FC = () => {
  const [book, setBook] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [totalProducts, setTotalProducts] = useState();
  const [limit, setLimit] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const [filter, setFilter] = useState<BookQuery>({
    title: "",
    sortByEnum: undefined,
    rate: [],
    author: [],
    category: [],
    page: 1,
    limit: 12,
  });
  useEffect(() => {
    findAllBooks();
  }, [filter]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const findAllBooks = async () => {
    setLoading(true);
    await delay(1000);
    const result = await fetchAllBooks(filter);
    if (!result.data.data) {
      errorPopUpMessage(
        "Failed to fetch all books",
        result.data.errors[0].message
      );
      return;
    }
    const responseData = result.data.data.findAllBooks;
    setBook(responseData.list);
    setLimit(responseData.limit);
    setTotalProducts(responseData.totalProducts);
    setCurrentPage(responseData.currentPage);
    setLoading(false);
  };

  const onChangeSort = (val: string) => {
    switch (val) {
      case "ON_SALE":
        setFilter({ ...filter, sortByEnum: SortBookByEnum.ON_SALE });
        break;
      case "POPULAR":
        setFilter({ ...filter, sortByEnum: SortBookByEnum.POPULAR });
        break;
      case "NEW":
        setFilter({ ...filter, sortByEnum: SortBookByEnum.NEW });
        break;
      case "ALL":
        setFilter({ ...filter, sortByEnum: undefined });
        break;
      default:
        break;
    }
  };
  const onChangePage = (val: number) => {
    setFilter({
      ...filter,
      page: val,
    });
  };
  return (
    <ShopView
      item={book}
      currentPage={currentPage}
      totalItems={totalProducts}
      limit={limit}
      onChangeSort={onChangeSort}
      onChangePage={onChangePage}
      setFilter={setFilter}
      filter={filter}
      loading={loading}
    />
  );
};

export default ShopPage;
