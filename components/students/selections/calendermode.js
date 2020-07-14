import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import Helper from "../../../lib/helper";
import API from "../../../lib/api";
import ShowCourseModal from "./showcoursemodal";
import CourseSelect from "./courseselect";
import Calenderheader from "./calenderheader"

function CalenderMode() {
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      API.getStudentCourseList(query).then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          setLoading(false);
          return;
        }
        let data = res.data.datas.map((item) => {
          return {
            ...item,
            key: item["id"],
            course_date: Helper.formatDate(item["course_date"]),
          };
        });
        setStudentCourseList(data);
        setLoading(false);
      });
    };
    fetchData();
  }, [query]);

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

  const getListData = (value) => {
    const date = value.format("YYYY-MM-DD");
    let courseList = studentCourseList.filter((value, index) => {
      return (
        Helper.formatDate(value["course_date"]) === date
      );
    });

    return courseList || [];
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalQuery, setModalQuery] = useState();
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  // Global bool to prevent modal from opening when year/month changes
  let modalShouldOpen = true;
  const keepModalClosed = () => {
    modalShouldOpen = false;
  };
  const onCellSelect = (value) => {
    if (!modalShouldOpen) {
        modalShouldOpen = true;
        return;
      }
    setModalVisible(true);
    const date = value.format("YYYY-MM-DD");
    let query = `?date=${date}`;
    if (courseID) {
        query += `&course_id=${courseID}`;
    }
    setModalQuery(query);
  }

  const [courseID, setCourseID] = useState();
  const onCourseChange = (value) => {
    setCourseID(value);
    let query = "";
    if(value){
      query += `?course_id=${value}`
    }
    setQuery(query)
  };
  
  return (
    <React.Fragment>
      <ShowCourseModal
        visible={modalVisible}
        query={modalQuery}
        toggleModal={toggleModal}
      />
      <CourseSelect onCourseChange={onCourseChange} />
      <Calendar
        headerRender={({ value, onChange }) => {
         return Calenderheader({ value, onChange, keepModalClosed });
        }}
        dateCellRender={dateCellRender}
        onSelect={onCellSelect}
        loading={loading}
      />
    </React.Fragment>
  );
}

export default CalenderMode;