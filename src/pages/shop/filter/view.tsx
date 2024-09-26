import { Checkbox, Flex, Rate, Input } from "antd";
import React, { FC } from "react";
import { ICategory } from "../../../shared/constants/types/category.type";
import { IAuthor } from "../../../shared/constants/types/author.type";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SearchProps } from "antd/es/input";

interface FilterComponentProps {
  category: ICategory[] | undefined;
  author: IAuthor[] | undefined;
  onChangeCategory: (checkedValues: CheckboxValueType[]) => void;
  onChangeAuthor: (checkedValues: CheckboxValueType[]) => void;
  onChangeRating: (checkedValues: CheckboxValueType[]) => void;
  onSearch: SearchProps["onSearch"];
}

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

const filterContainerStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid",
  padding: 5,
  width: "200px",
  textAlign: "center",
  height: '200px',
  overflow: "scroll",
  overflowX: "hidden"
};

const { Search } = Input;

const FilterComponent: FC<FilterComponentProps> = (props) => {
  const {
    category,
    author,
    onChangeCategory,
    onChangeAuthor,
    onSearch,
    onChangeRating,
  } = props;

  const categoryOption: Option[] =
    (category
      ?.map((item) =>
        item.name && item.id ? { label: item.name, value: item.id } : null
      )
      .filter(Boolean) as Option[]) || []; // Remove empty option

  const authorOption: Option[] =
    (author
      ?.map((item) =>
        item.name && item.id ? { label: item.name, value: item.id } : null
      )
      .filter(Boolean) as Option[]) || []; // Remove empty option
  const ratingOption = [
    { label: <Rate disabled defaultValue={1} style={{fontSize: 15}} />, value: 1 },
    { label: <Rate disabled defaultValue={2} style={{fontSize: 15}}/>, value: 2 },
    { label: <Rate disabled defaultValue={3} style={{fontSize: 15}}/>, value: 3 },
    { label: <Rate disabled defaultValue={4} style={{fontSize: 15}}/>, value: 4 },
    { label: <Rate disabled defaultValue={5} style={{fontSize: 15}}/>, value: 5 },
  ];
  return (
    <div style={{ padding: 5 }}>
      <Flex align="center" justify="center" gap={20} vertical>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200, border: "1px solid" }}
        />
        <div style={filterContainerStyle}>
          <h3>Category</h3>
          <Checkbox.Group
            style={{ display: "flex", flexDirection: "column", padding: 5 }}
            options={categoryOption}
            onChange={onChangeCategory}
          />
        </div>

        <div style={filterContainerStyle}>
          <h3>Author</h3>
          <Checkbox.Group
            style={{ display: "flex", flexDirection: "column", padding: 5 }}
            options={authorOption}
            onChange={onChangeAuthor}
          />
        </div>

        <div style={filterContainerStyle}>
          <h3>Rate</h3>
          <Checkbox.Group
            style={{ display: "flex", flexDirection: "column", padding: 5 }}
            options={ratingOption}
            onChange={onChangeRating}
          />
        </div>
      </Flex>
    </div>
  );
};

export default FilterComponent;
