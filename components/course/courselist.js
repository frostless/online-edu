import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import timeago from '../../lib/timeago'
import {columns, filterColumn, placeHolder} from "./columnsconfig";
import { Table } from "antd";
import SearchBar from "../searchbar";

const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
};

let originalData = [];

function CourseList() {
  const [courseData, setCourseData] = useState([]);

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
          createdAt: timeago.format(new Date(item["ctime"]))
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
      <Table columns={columns} dataSource={courseData} onChange={onChange} />
    </React.Fragment>
  );
}

export default CourseList;
