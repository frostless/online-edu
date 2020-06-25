import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import styled from "styled-components";
import { Button, Input, Select } from "antd";
const { Option } = Select;

// Properties
// End Properties

// Style Components
// End Style Components

const nameEmptyError = "Please ensure student name is not empty";
const pwEmptyError = "Please ensure password is not empty";
const courseInvalidError = "Please ensure course is valid";
const studentTypeInvalidError = "Please ensure student type is valid";
const errorTitle = "Editing Student Error";
const successTitle = "Editing Student Sucessfully";

function EditStudent(props) {
  const [studentTypeList, setStudentTypeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseID, setCourseID] = useState();
  const [studentName, setStudentName] = useState();
  const [password, setPassword] = useState();
  const [studentTypeID, setStudentTypeID] = useState();
  const [address, setAddress] = useState();
  const defaultStudentType = "Select From the List";
  const defaultCourse = "Select From the List";

  const studentID = props["id"];
  const isNewStudent = !studentID;

  const validatInput = () => {
    if (!studentName) return nameEmptyError;

    if (!password) return pwEmptyError;

    if (!studentTypeID) return studentTypeInvalidError;

    if (!courseID) return courseInvalidError;
  };

  const addNewStudent = () => {
    try {
      API.addStudent({
        student_name: studentName,
        student_type: studentTypeID,
        course_id: courseID,
        address: address,
      });
    } catch (e) {
      return e;
    }
  };

  const updateStudent = () => {
    try {
      API.updateStudent({
        student_id: courseID,
        student_name: studentName,
        student_type: studentTypeID,
        course_id: courseID,
        address: address,
      });
    } catch (e) {
      return e;
    }
  };

  const processstudent = () => {
    let response;
    if (isNewStudent) {
      response = addNewStudent();
    } else {
      response = updateStudent();
    }
    return response;
  };

  const onClick = () => {
    let error = validatInput();
    if (error) {
      Notification.notify(errorTitle, error);
      return;
    }

    error = processstudent();
    if (error) {
      Notification.notify(errorTitle, error);
      return;
    }

    // Cleanup
    setStudentTypeID(defaultStudentType);
    setCourseID(defaultCourse);
    setStudentName();
    setPassword();
    setAddress();
    Notification.notify(
      successTitle,
      `Student '${studentName}' has been edited successfully`
    );
  };

  const onStudentTypeChange = (studentTypeID) => {
    setStudentTypeID(studentTypeID);
  };

  const onStudentNameChange = (e) => {
    const studentName = e.target.value;
    setStudentName(studentName);
  };

  const onPasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onCourseChange = (courseID) => {
    setCourseID(courseID);
  };

  const onAddressChange = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  useEffect(() => {
    API.getStudentTypeList().then((res) => {
      let studentTypeList = [];
      res.data.datas.forEach((element) => {
        const id = element["id"],
          name = element["name"];
        const option = (
          <Option key={id} value={id}>
            {name}
          </Option>
        );
        studentTypeList.push(option);
      });
      setStudentTypeList(studentTypeList);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ width: "30%" }}>
      <div>
        <Input
          placeholder="Student Name"
          value={studentName}
          onChange={onStudentNameChange}
        />
      </div>
      <br />
      <div>
        <Input
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <br />
      <div>
        <Select
          defaultValue={defaultStudentType}
          value={studentTypeID}
          loading={loading}
          onChange={onStudentTypeChange}
          style={{ width: "100%" }}
        >
          {studentTypeList}
        </Select>
      </div>
      <br />
      <div>
        <Select
          defaultValue={defaultCourse}
          value={courseID}
          loading={loading}
          onChange={onCourseChange}
          style={{ width: "100%" }}
        >
          <Option key="1" value="1">
            demo 1
          </Option>
          <Option key="2" value="2">
            demo 2
          </Option>
          <Option key="3" value="3">
            demo 3
          </Option>
        </Select>
      </div>
      <br />
      <div>
        <Input
          placeholder="Address"
          value={address}
          onChange={onAddressChange}
        />
      </div>
      <br />
      <div>
        <Button type="primary" onClick={onClick}>
          Save Student
        </Button>
      </div>
    </div>
  );
}

export default EditStudent;