import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import styled from "styled-components";
import { Button } from 'antd';
import { Input } from "antd";
import { Select } from "antd";

const { Option } = Select;

// Properties
// End Properties

// Style Components
// End Style Components

function AddCourse() {
    const [courseTypeList, setCourseTypeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseTypeID, setCourseTypeID] = useState();
    const [courseName, setCourseName] = useState();

    const onClick = () => {
      try {
        API.addCourse({
          name: courseName,
          homework: "no",
          typeId: courseTypeID,
        });
      } catch (e) {

      }
      
    };

    const onCourseTypeChange = (courseTypeID) => {
        setCourseTypeID(courseTypeID);
    };

    const onCourseNameChange = (e) => {
      const courseName = e.target.value;
      setCourseName(courseName);
    };

    useEffect(() => {
      API.getCourseTypeList().then((res) => {
        let courseTypeList = [];
        res.data.datas.forEach(element => {
            const id = element['id'], name = element['name'];
            const option = <Option key={id} value={id}>{name}</Option>
            courseTypeList.push(option)
        })
        setCourseTypeList(courseTypeList);
        setLoading(false);  
      });
    }, []);

  return (
    <div style={{ width: "30%" }}>
      <div>
        <Input placeholder="Course Name" onChange={onCourseNameChange} />
      </div>
      <br />
      <div>
        <Select
          defaultValue="Select From the List"
          loading={loading}
          onChange={onCourseTypeChange}
          style={{ width: "100%" }}
        >
          {courseTypeList}
        </Select>
      </div>
      <br />
      <div>
        <Button type="primary" onClick={onClick}>
          Save Course
        </Button>
      </div>
    </div>
  );
}

export default AddCourse;
