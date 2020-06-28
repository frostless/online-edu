import React, {useEffect, useState} from 'react';
import API from '../../lib/api'
import timeago from '../../lib/timeago'
import { listColumns, listFilterColumn, listPlaceHolder} from "./columnconfig";
import { Table } from 'antd';
import SearchBar from "../searchbar";

const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
};

let originalData = [];

function StudentList() {
  const [studentData, setStudentData] = useState([]);

  const updateList = (newList) => {
    setStudentData(newList);
  };

  const getSelectedCurriculum = (curriculumArray) => {
    let array = curriculumArray.map((item) => {
      return item["name"];
    });
    return array.toString();
  };

  useEffect(() => {
    API.getStudentList().then((res) => {
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          joinTime: timeago.format(new Date(item["ctime"])),
          selectedCurriculum: getSelectedCurriculum(item["courses"]),
          studentType: item["type_name"]
        };
      });
      originalData = data;
      setStudentData(data);
    });
  }, []);

  return (
    <React.Fragment>
      <div style={{ width: "30%" }}>
        <SearchBar
          updateList={updateList}
          filterColumn={listFilterColumn}
          placeHolder={listPlaceHolder}
          oldList={originalData}
        />
      </div>
      <br />
      <Table columns={listColumns} dataSource={studentData} onChange={onChange} />
    </React.Fragment>
  );
}

export default StudentList;
