import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import styled from "styled-components";
import { Button, Input, Select } from 'antd';
const { Option } = Select;

// Properties
// End Properties

// Style Components
// End Style Components

const courseNameEmptyError = "Please ensure course name is not empty";
const courseTypeInvalidError = "Please ensure course type is valid";
const errorTitle = "Adding Course Error";
const successTitle = "Adding Course Sucessfully";

function EditCourse(props) {
    const [courseTypeList, setCourseTypeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseTypeID, setCourseTypeID] = useState();
    const [courseName, setCourseName] = useState();
    const defaultCourseType = "Select From the List";

    const courseID = props['id'];
    const isNewCourse = !courseID;

    const validatInput = () => {
      if(!courseName)
        return courseNameEmptyError;

      if(!courseTypeID)
        return courseTypeInvalidError;
    }

    const addNewCourse = () =>{
      try {
        API.addCourse({
          name: courseName,
          homework: "no",
          typeId: courseTypeID,
        });
      } catch (e) {
        return e;
      } 
    }

    const updateCourse = () =>{
      try {
        API.updateCourse({
          id: courseID,
          name: courseName,
          homework: "no",
          typeId: courseTypeID,
        });
      } catch (e) {
        return e;
      } 
    }

    const processCourse = () => {
      let response;
      if(isNewCourse){
        response =  addNewCourse();
      } else {
        response = updateCourse();
      }
      return response;
    }

    const getCourseNotification = (courseName) => {
      let notification;
      if(isNewCourse){
        notification =  `New Course ${courseName} has been added successfully`;
      } else {
        notification = `Course ${courseName} has been updated successfully`;
      }
      return notification;
    }

    const onClick = () => {
      let error = validatInput();
      if (error) {
        Notification.notify(errorTitle, error);
        return;
      }

      error = processCourse();
      if (error) {
        Notification.notify(errorTitle, error);
        return;
      }

      // Cleanup
      setCourseTypeID(defaultCourseType);
      setCourseName();
      Notification.notify(successTitle, getCourseNotification(courseName));
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
        <Input
          placeholder="Course Name"
          value={courseName}
          onChange={onCourseNameChange}
        />
      </div>
      <br />
      <div>
        <Select
          defaultValue={defaultCourseType}
          value={courseTypeID}
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

export default EditCourse;
