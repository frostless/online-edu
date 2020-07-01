import React from "react";
import styled from "styled-components";
import { Input } from "antd";
const { Search } = Input;

// Properties
// End Properties

// Style Components
// End Style Components

function SearchBar(props) {
  const { onSearch, placeHolder } = props;

  return (
    <Search
      placeholder={placeHolder}
      onSearch={onSearch}
      enterButton
    />
  );
}

export default SearchBar;
