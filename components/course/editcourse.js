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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      API.getCourseTypeList().then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          return;
        }
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
        setLoading(false);
      });
    };
    fetchData();
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

  const updateCourse = async (course) => {
    try {
      await API.updateCourse(course);
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

  const processCourse = async (input) => {
    let response;
    let course = makCourse(input);
    if (isNewCourse) {
      response = await addNewCourse(course);
    } else {
      response = await updateCourse(course);
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

  const onFinish = async (input) => {
    const { courseName } = input;
    let res =  await API.addCourse(course);
    let success = API.CheckAPIResult(res);
    if (!success) {
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
              pattern: new RegExp("^(?!Please select from the list$)"),
              message: "Please select a valid course type!",
            },
          ]}
        >
          <Select style={{ width: "100%" }}>{courseTypeList}</Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditCourse;
