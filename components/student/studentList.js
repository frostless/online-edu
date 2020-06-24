import React, {useEffect, useState} from 'react';
import API from '../../lib/api'
import Columns from "./columnconfig";
import { Table } from 'antd';
import SearchBar from "../searchbar";

const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
};

let originalData = [];

function StudentList() {
  const [studentData, setStudentData] = useState([]);

  const filterColumn = "name";
  const placeHolder = "search by name";

  const updateList = (newList) => {
    setStudentData(newList);
  };

  useEffect(() => {
    API.getStudentList().then((res) => {
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          type: item["type_name"],
          joinTime: item["ctime"],
          selectedCurriculum: item["course_name"],
          studentType: item["type_name"],
          area: item["address"],
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
          filterColumn={filterColumn}
          placeHolder={placeHolder}
          oldList={originalData}
        />
      </div>
      <br />
      <Table columns={Columns} dataSource={studentData} onChange={onChange} />
    </React.Fragment>
  );
}

export default StudentList;
