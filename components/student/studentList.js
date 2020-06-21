import React, {useEffect, useState} from 'react';
import API from '../../lib/api'
import Helper from '../../lib/helper'
import Columns from "./columnconfig";
import { Table } from 'antd';
import SearchBar from "../searchbar";

const dataMapping = (input) => {
  const data = [];
  if (!Array.isArray(input)) return data;
  if (input.length === 0) return data;

  for (let i = 0; i < input.length; i++) {
    let obj = {};
    obj["key"] = input[i].student_id;
    obj["id"] = input[i].student_id;
    obj["name"] = input[i].student_name;
    obj["area"] = input[i].address;
    obj["joinTime"] = Helper.formatDate(input[i].ctime);
    obj["selectedCurriculum"] = input[i].course_name;
    obj["studentType"] = input[i].student_type_name;
    data.push(obj);
  }

  return data;
};

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
    API.getStudentList()
    .then(res => {
      // let data = res.data.datas.map((item, key) =>{
      //   ...ietm,
      //   key:key
      // });
      let data = res.data.datas;
      originalData = data = dataMapping(data);
      setStudentData(data);
    })
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
