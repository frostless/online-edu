import React, { useState, useEffect } from "react";
import { Select } from "antd";
import API from "../../../lib/api";

const { Option } = Select;

function CourseSelect(props) {
  const [courseList, setCourseList] = useState([]);
  const { onCourseChange } = props;

  useEffect(() => {
    const fetchData = async () => {
      API.getCourseList().then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          return;
        }
        let courseList = [];
        courseList.push(
          <Option key={0} value={0}>
            All
          </Option>
        );
        res.data.datas.forEach((element) => {
          const { id, name } = element;
          const option = (
            <Option key={id} value={id}>
              {name}
            </Option>
          );
          courseList.push(option);
        });
        setCourseList(courseList);
      });
    };
    fetchData();
  }, []);

  const onChange = (value) => {
    onCourseChange(value);
  };

  return (
    <Select
      style={{ width: "20%" }}
      defaultValue="Please select from the list"
      onChange={onChange}
    >
      {courseList}
    </Select>
  );
}

export default CourseSelect;
