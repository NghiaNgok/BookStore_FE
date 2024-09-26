import { FC, useEffect, useState } from "react";

import FilterComponent from "./view";
import { fetchAllCategory } from "../../../shared/services/category/category.service.ts";
import { fetchAllAuthor } from "../../../shared/services/author/author.service.ts";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SearchProps } from "antd/es/input/Search";
import { BookQuery } from "../../../shared/constants/types/book.type.ts";

interface FilterProps {
  filter: BookQuery;
  setFilter: (value: BookQuery) => void;
}

const Filter: FC<FilterProps> = (props) => {
  const { filter, setFilter } = props;
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    getAllCategory();
    getAllAUthor();
  }, []);

  const getAllAUthor = () => {
    fetchAllAuthor()
      .then((res) => {
        const responseData = res.data.data.findAllAuthors;
        setAuthor(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCategory = () => {
    fetchAllCategory()
      .then((res) => {
        const responseData = res.data.data.findAllCategories;
        setCategory(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeCategory = (checkedValues: CheckboxValueType[]) => {
    const stringValues = checkedValues.map((value) => value.toString());
    setFilter({
      ...filter,
      category: stringValues,
      page: 1
    });
  };

  const onChangeAuthor = (checkedValues: CheckboxValueType[]) => {
    const stringValues = checkedValues.map((value) => value.toString());
    setFilter({
      ...filter,
      author: stringValues,
      page: 1
    });
  };

  const onChangeRating = (checkedValues: CheckboxValueType[]) => {
    const stringValues = checkedValues.map((value) =>
      parseInt(value as string)
    );
    setFilter({
      ...filter,
      rate: stringValues,
      page: 1
    });
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    setFilter({
      ...filter,
      title: value,
      page: 1
    });
  };

  return (
    <FilterComponent
      category={category}
      author={author}
      onChangeCategory={onChangeCategory}
      onChangeAuthor={onChangeAuthor}
      onChangeRating={onChangeRating}
      onSearch={onSearch}
    />
  );
};
export default Filter;
