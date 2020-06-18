import React from "react";
import styled from "styled-components";
import { Input } from "antd";
const { Search } = Input;

// Properties
// End Properties

// Style Components
// End Style Components

function SearchBar(props) {
  const updateList = props.updateList;
  const placeHolder = props.placeHolder;
  const filterColumn = props.filterColumn;
  const oldList = props.oldList;

  const onSearch = (value) => {
    const newList = oldList.filter((course) => {
      return course[filterColumn].includes(value);
    });

    updateList(newList);
  };
  return (
    <Search
      style={{ width: "30%" }}
      placeholder={placeHolder}
      onSearch={onSearch}
      enterButton
    />
  );
}

export default SearchBar;
