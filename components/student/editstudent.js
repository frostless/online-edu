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

function EditStudent(props) {
  const { id } = props;
  const studentID = id;
  const isNewStudent = !studentID;
  const [form] = Form.useForm();

  const [studentTypeList, setStudentTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      API.getStudentTypeList().then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          setLoading(false);
          return;
        }
        let studentTypeList = [];
        res.data.datas.forEach((element) => {
          const { id, name } = element;
          const option = (
            <Option key={id} value={id}>
              {name}
            </Option>
          );
          studentTypeList.push(option);
        });
        setStudentTypeList(studentTypeList);
        if (isNewStudent){
          setLoading(false);
        }
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isNewStudent) return;

    const fetchData = async () => {
      API.getStudent(studentID).then((res) => {
        const student = res.data.datas[0];
        const { name, address, type_id } = student;
        form.setFieldsValue({
          studentName: name,
          address: address,
          studentType: type_id,
        });
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  const makeStudent = (input) => {
    let student = {
      name: input["studentName"],
      type_id: input["studentType"],
      address: input["address"],
      email: input["email"]
    };

    if (!isNewStudent) 
      student["id"] = studentID;

    return student;
  };

  const getSuccessTitle = () => {
    return isNewStudent
      ? "Adding Student Successfully"
      : "Editing Student Successfully";
  };

  const getFailueTitle = () => {
    return isNewStudent ? "Adding Student Failed" : "Editing Student Failed";
  };

  const getSuccessContent = (studentName) => {
    return isNewStudent
      ? `Student '${studentName}' has been added successfully`
      : `Student '${studentName}' has been edited successfully`;
  };

  const onFinish = async (input) => {
    setLoading(true);
    const { studentName } = input;
    let student = makeStudent(input);
    let res;
    if (isNewStudent) {
      res = await API.addStudent(student);
    } else {
      res = await API.updateStudent(student);
    }

    let success = API.CheckAPIResult(res);
    if (!success) {
      Notification.notify(getFailueTitle(), `Error Code: ${res['code']}, Error Message: ${res['msg']}`);
      setLoading(false);
      return;
    }

    Notification.notify(getSuccessTitle(), 
      getSuccessContent(studentName));
      setLoading(false);
  };

  return (
    <div style={{ width: "30%" }}>
      <Form name="course" onFinish={onFinish} form={form}>
        <Form.Item
          name="studentName"
          rules={[
            {
              required: true,
              message: "Please enter student name!",
            },
          ]}
        >
          <Input type="text" placeholder="Student Name" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          type="email"
          placeholder="Email"
        />
      </Form.Item>
        <Form.Item
          name="studentType"
          initialValue="Please select from the list"
          rules={[
            {
              required: true,
              pattern: new RegExp("^(?!Please select from the list$)"),
              message: "Please select a valid student type!",
            },
          ]}
        >
          <Select style={{ width: "100%" }}> {studentTypeList} </Select>
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter address!",
            },
          ]}
        >
          <Input type="text" placeholder="Address" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditStudent;