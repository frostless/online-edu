import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Columns from "./columnsconfig";
import { Table } from "antd";
import SearchBar from "../searchbar";

const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
};

let originalData = [];

function CourseList() {
  const [courseData, setCourseData] = useState([]);
  const filterColumn = "name";
  const placeHolder = "search by name";

  const updateList = (newList) => {
    setCourseData(newList);
  };

  useEffect(() => {
    API.getCourseList().then((res) => {
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          type: item["type_name"],
        };
      });
      originalData = data;
      setCourseData(data);
    });
  }, []);

  return (
    <React.Fragment>
      <div style={{ width: "30%" }}>
        <SearchBar
          updateList={updateList}
          filterColumn={filterColumn}
          placeHolder={placeHolder}
          oldList={originalData}
        />
      </div>
      <br />
      <Table columns={Columns} dataSource={courseData} onChange={onChange} />
    </React.Fragment>
  );
}

export default CourseList;
