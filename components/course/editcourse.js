import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import styled from "styled-components";
import { Form, Button, Input, Select } from "antd";
const { Option } = Select;

// Properties
// End Properties

// Style Components
// End Style Components

function EditCourse(props) {
  const { id } = props;
  const courseID = id;
  const isNewCourse = !courseID;
  const [form] = Form.useForm();

  const [courseTypeList, setCourseTypeList] = useState([]);
  useEffect(() => {
    API.getCourseTypeList().then((res) => {
      let courseTypeList = [];
      res.data.datas.forEach((element) => {
        const { id, name } = element;
        const option = (
          <Option key={id} value={id}>
            {name}
          </Option>
        );
        courseTypeList.push(option);
      });
      setCourseTypeList(courseTypeList);
    });
  }, []);
  
  useEffect(() => {
    if(isNewCourse)
      return;

    API.getCourse(courseID).then(res => {
      const course = res.data.datas[0];
      const {name, type_id} = course;
      form.setFieldsValue({ courseName: name, courseType: type_id });
    })
  }, []);


  const addNewCourse = (course) => {
    try {
      API.addCourse(course);
    } catch (e) {
      return e;
    }
  };

  const updateCourse = (course) => {
    try {
      API.updateCourse(course);
    } catch (e) {
      return e;
    }
  };

  const makCourse = (input) => {
    let course = {
      name: input["courseName"],
      homework: "no",
      type_id: input["courseType"],
    }

    if (!isNewCourse) 
      course["id"] = courseID;

    return course;
  };

  const processCourse = (input) => {
    let response;
    let course = makCourse(input);
    if (isNewCourse) {
      response = addNewCourse(course);
    } else {
      response = updateCourse(course);
    }
    return response;
  };

  const getSuccessTitle = () => {
    return isNewCourse ? "Adding Course Successfully" : "Editing Course Successfully";
  };

  const getFailueTitle = () => {
    return isNewCourse ? "Adding Course Failed" : "Editing Course Failed";
  };

  const getSuccessContent = (courseName) => {
    return isNewCourse
      ? `Course '${courseName}' has been added successfully`
      : `Course '${courseName}' has been edited successfully`;
  };

  const onFinish = (input) => {
    const { courseName } = input;
    let error = processCourse(input);
    if (error) {
      Notification.notify(getFailueTitle(), error);
      return;
    }

    Notification.notify(
      getSuccessTitle(),
      getSuccessContent(courseName)
    );
  };

  return (
    <div style={{ width: "30%" }}>
      <Form name="course" onFinish={onFinish} form={form}>
        <Form.Item
          name="courseName"
          rules={[
            {
              required: true,
              message: "Please enter course name!",
            },
          ]}
        >
          <Input type="text" placeholder="Course Name" />
        </Form.Item>
        <Form.Item
          name="courseType"
          initialValue="Please select from the list"
          rules={[
            {
              required: true,
              message: "Please select course type!",
            },
          ]}
        >
          <Select style={{ width: "100%" }}>{courseTypeList}</Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditCourse;
