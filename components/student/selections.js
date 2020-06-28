import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { selectionColumns, selectionFilterColumn, selectionPlaceHolder } from "./columnconfig";
import { Table, Button } from "antd";
import Helper from "../../lib/helper";
import SearchBar from "../searchbar";
import AddCourseModal from "./addcoursemodal";

const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
};

let originalData = [];

function Selections() {
  const [studentData, setStudentData] = useState([]);
  const [newStudentCourse, setNewStudentCourse] = useState(false);
  const handleStudentCourseAdded = () => {
    setNewStudentCourse(true);
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
      console.log(data.length)
    });
  }, [newStudentCourse]);

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
          filterColumn={selectionFilterColumn}
          placeHolder={selectionPlaceHolder}
          oldList={originalData}
        />
      </div>
      <br />
      <Table
        columns={selectionColumns}
        dataSource={studentData}
        onChange={onChange}
      />
    </React.Fragment>
  );
}

export default Selections;