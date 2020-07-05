import React, { useEffect, useState } from "react";
import API from "../../../lib/api";
import Notification from "../../../lib/notification";
import { Modal, Button, Select, Form, DatePicker } from "antd";

function AddCoueseModal(props) {
  const { visible, toggleModal, handleStudentCourseAdded } = props;
  const [loading, setLoading] = useState(false);

  const { Option } = Select;
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";

  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    if (!visible) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      API.getStudentList().then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          return;
        }
        let studentList = [];
        res.data.datas.forEach((element) => {
          const { id, name } = element;
          const option = (
            <Option key={id} value={id}>
              {name}
            </Option>
          );
          studentList.push(option);
        });
        setStudentList(studentList);
      });
    };
    fetchData();
  }, [visible]);

  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    if (!visible) {
      return;
    }
    const fetchData = async () => {
      API.getCourseList().then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          return;
        }
        let courseList = [];
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
        setLoading(false);
      });
    };
    fetchData();
  }, [visible]);

  const onFinish = async (input) => {
    setLoading(true);

    const studentCourse = makeStudentCourse(input);

    const res = await API.addStudetCourse(studentCourse);
    let success = API.CheckAPIResult(res);
    if (!success) {
      Notification.notify("Course Added Failed", error);
      return;
    }

    Notification.notify(
      "Course Added Successful",
      "Course has been added successfully"
    );

    setLoading(false);
    toggleModal();
    // Refresh parent student course list
    handleStudentCourseAdded();
  };

  const makeStudentCourse = (input) => {
    let courseDate =input["course_date"].format('YYYY-MM-DD')
    input["course_date"] = courseDate;

    return input;
  };

  return (
    <Modal
      visible={visible}
      title="Add Course Selection"
      onOk={toggleModal}
      onCancel={toggleModal}
      footer={[
        <Button key="back" onClick={toggleModal}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={form.submit}
          loading={loading}
        >
          Save Course
        </Button>,
      ]}
    >
      <Form form={form} name="addcourse" onFinish={onFinish}>
        <Form.Item
          name="student_id"
          initialValue="Please select from the list"
          rules={[
            {
              required: true,
              pattern: new RegExp("^(?!Please select from the list$)"),
              message: "Please select a valid student!",
            },
          ]}
        >
          <Select style={{ width: "100%" }}> {studentList} </Select>
        </Form.Item>
        <Form.Item
          name="course_id"
          initialValue="Please select from the list"
          rules={[
            {
              required: true,
              pattern: new RegExp("^(?!Please select from the list$)"),
              message: "Please select a valid course!",
            },
          ]}
        >
          <Select style={{ width: "100%" }}> {courseList} </Select>
        </Form.Item>
        <Form.Item
          name="course_date"
          rules={[
            {
              required: true,
              message: "Please select a valid course date!",
            },
          ]}
        >
          <DatePicker format={dateFormat} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddCoueseModal;