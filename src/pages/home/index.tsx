import { FC, useEffect, useState } from "react";
import Homeview from "./view";
import { fetchAllBooks } from "../../shared/services/book/book.service";
import {
  BookQuery,
  IBook,
  SortBookByEnum,
} from "../../shared/constants/types/book.type";

const HomePage: FC = () => {
  const [book, setBook] = useState<IBook[]>();
  const [featuredBook, setFeaturedBook] = useState<IBook[]>();
  const [filter, setFilter] = useState<BookQuery>({
    sortByEnum: SortBookByEnum.NEW,
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    findAllBooksOnSale();
  }, []);

  useEffect(() => {
    findAllBooksFeatured(filter);
  }, [filter])

  const findAllBooksOnSale = () => {
    fetchAllBooks({
      sortByEnum: SortBookByEnum.ON_SALE,
      page: 1,
      limit: 5,
    })
      .then((res) => {
        const responseData = res.data.data.findAllBooks;
        setBook(responseData.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findAllBooksFeatured = (value:BookQuery ) => {
    fetchAllBooks(value)
      .then((res) => {
        const responseData = res.data.data.findAllBooks;
        setFeaturedBook(responseData.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <Homeview filter={filter} featuredBook={featuredBook} data={book} setFilter={setFilter} />;
};

export default HomePage;
