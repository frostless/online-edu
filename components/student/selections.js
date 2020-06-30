import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { Table, Button, Space } from "antd";
import Helper from "../../lib/helper";
import SearchBar from "../searchbar";
import Link from 'next/link'
import AddCourseModal from "./addcoursemodal";

const { Column } = Table;

const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
};

let originalData = [];

function Selections() {
  const [studentData, setStudentData] = useState([]);
  const [updateCounter, setUpdateCounter] = useState(0);
  const handleStudentCourseAdded = () => {
    setUpdateCounter(updateCounter + 1);
  };
  useEffect(() => {
    API.getStudentCourseList().then((res) => {
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          course_date: Helper.formatDate(item["course_date"]),
        };
      });
      originalData = data;
      setStudentData(data);
    });
  }, [updateCounter]);

  const updateList = (newList) => {
    setStudentData(newList);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={toggleModal}>
          Add Course
        </Button>
      </div>
      <br />
      <AddCourseModal visible={modalVisible} handleStudentCourseAdded={handleStudentCourseAdded} toggleModal={toggleModal} />
      <div style={{ width: "30%" }}>
        <SearchBar
          updateList={updateList}
          filterColumn="student_name"
          placeHolder="search by name"
          oldList={originalData}
        />
      </div>
      <br />
      <Table dataSource={studentData} onChange={onChange}>
       <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Name"
          dataIndex="student_name"
          key="student_name"
          sorter={(a, b) => a["student_name"].localeCompare(b["student_name"])}
        />
         <Column
          title="Selected Course"
          dataIndex="course_name"
          key="course_name"
        />
          <Column
          title="Course date"
          dataIndex="course_date"
          key="course_date"
        />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
            <Link href={`/student/editstudentcourse?id=${record["id"]}`}><a>Edit</a></Link>
            <a>Delete</a>
          </Space>
          )}
        />
        </Table>
    </React.Fragment>
  );
}

export default Selections;