import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { Table, Button, Space, Tabs, Calendar, Badge } from "antd";
import Helper from "../../lib/helper";
import SearchBar from "../searchbar";
import Link from 'next/link'
import AddCourseModal from "./addcoursemodal";

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
    console.log(key);
  }

  const getListData = (value) => {
    let listData;
    let date = value.date();
    let course = studentData.find((value, index) => {
      return Helper.getDate(value["course_date"]) == date;
    })
    console.log(course)
    return listData || [];
  }
  
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

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
        <SearchBar
          onSearch={onSearch}
          placeHolder="search by name"
        />
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
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
}

export default Selections;