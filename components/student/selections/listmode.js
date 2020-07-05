import React, { useEffect, useState } from "react";
import AddCourseModal from "./addcoursemodal";
import { Table, Button, Space } from "antd";
import SearchBar from "../../searchbar";
import Helper from "../../../lib/helper";
import Link from 'next/link'
import API from "../../../lib/api";

const { Column } = Table;

let originalData = [];

function ListMode() {
  const [studentCourseData, setStudentCourseData] = useState([]);
  const [updateCounter, setUpdateCounter] = useState(0);
  const handleStudentCourseAdded = () => {
    setUpdateCounter(updateCounter + 1);
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      API.getStudentCourseList().then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          return;
        }
        let data = res.data.datas.map((item) => {
          return {
            ...item,
            key: item["id"],
            course_date: Helper.formatDate(item["course_date"]),
          };
        });
        originalData = data;
        setStudentCourseData(data);
        setLoading(false);
      });
    };
    fetchData();
  }, [updateCounter]);

  const onSearch = (value) => {
    const newList = originalData.filter((item) => {
      return item["student_name"].includes(value);
    });
    setStudentCourseData(newList);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    //   console.log("params", pagination, filters, sorter, extra);
  };  

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={toggleModal}>
          Add Course
        </Button>
      </div>
      <br />
      <AddCourseModal
        visible={modalVisible}
        handleStudentCourseAdded={handleStudentCourseAdded}
        toggleModal={toggleModal}
      />
      <div style={{ width: "30%" }}>
        <SearchBar onSearch={onSearch} placeHolder="search by name" />
      </div>
      <br />
      <Table dataSource={studentCourseData} onChange={onChange} loading={loading}>
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
        <Column title="Course date" dataIndex="course_date" key="course_date" />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
              <Link href={`/student/editstudentcourse?id=${record["id"]}`}>
                <a>Edit</a>
              </Link>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
}

export default ListMode;