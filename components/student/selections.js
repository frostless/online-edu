import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { Table, Button, Space, Tabs, Calendar, Modal, Select } from "antd";
import Helper from "../../lib/helper";
import SearchBar from "../searchbar";
import Link from 'next/link'
import AddCourseModal from "./addcoursemodal";

const { Option } = Select;

const { TabPane } = Tabs;

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

  const onSearch = (value) => {
    const newList = originalData.filter((item) => {
      return item["student_name"].includes(value);
    });
    setStudentData(newList);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onTabChange = (key) => {
  }

  const getListData = (value) => {
    const date = value.format("YYYY-MM-DD");
    let courses = studentData.filter((value, index) => {
      return (
        Helper.formatDate(value["course_date"]) === date
      );
    });

    return courses || [];
  };
  
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul>
        {listData.map(item => (
          <li key={item["id"]}>
            {item["course_name"]}
          </li>
        ))}
      </ul>
    );
  }

  const [studentCourseData, setStudentCourseData] = useState([]);
  const onCellSelect = (value) => {
    setVisible(true);
    const date = value.format("YYYY-MM-DD");
    let query = `?date=${date}`;
    if (courseID) {
      query += `&course_id=${courseID}`;
    }
    API.getStudentCourseList(query).then((res) => {
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
        };
      });
      setStudentCourseData(data);
  })
}

  const [visible, setVisible] = useState(false);
  const closemModal = () => {
    setVisible(false);
  };

  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    API.getCourseList().then((res) => {
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
  }, []);

  const [courseID, setCourseID] = useState();
  const onCourseChange = (value) => {
    setCourseID(value);
    let query = "";
    if(value){
      query += `?course_id=${value}`
    }
    API.getStudentCourseList(query).then((res) => {
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          course_date: Helper.formatDate(item["course_date"])
        };
      });
      setStudentData(data);
    });
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
      <Tabs defaultActiveKey="listMode" onChange={onTabChange}>
        <TabPane tab="List Mode" key="listMode">
          <Table dataSource={studentData} onChange={onChange}>
            <Column title="ID" dataIndex="id" key="id" />
            <Column
              title="Name"
              dataIndex="student_name"
              key="student_name"
              sorter={(a, b) =>
                a["student_name"].localeCompare(b["student_name"])
              }
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
                  <Link href={`/student/editstudentcourse?id=${record["id"]}`}>
                    <a>Edit</a>
                  </Link>
                  <a>Delete</a>
                </Space>
              )}
            />
          </Table>
        </TabPane>
        <TabPane tab="Calender Mode" key="calenderMode">
          <Modal
            visible={visible}
            title="Selection Detail"
            onCancel={closemModal}
            footer={[
              <Button key="ok" type="primary" onClick={closemModal}>
                OK
              </Button>,
            ]}
          >
            <Table dataSource={studentCourseData}>
              <Column
                title="Name"
                dataIndex="student_name"
                key="student_name"
              />
              <Column
                title="Course"
                dataIndex="course_name"
                key="course_name"
              />
            </Table>
          </Modal>
          <Select style={{ width: "20%" }} defaultValue="Please select from the list" onChange={onCourseChange}> {courseList} </Select>
          <Calendar
            dateCellRender={dateCellRender}
            mode="month"
            onSelect={onCellSelect}
          />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
}

export default Selections;