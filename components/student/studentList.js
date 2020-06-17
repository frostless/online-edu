import React, {useEffect, useState} from 'react';
import API from '../../lib/api'
import Helper from '../../lib/helper'
import { Input } from 'antd';
import Columns from "./columnconfig";
import { Table } from 'antd';

const { Search } = Input;

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

  const onSearch = (name) => {
    if (name === "") {
      setStudentData(originalData);
    }

    const filteredData = originalData.filter((student) => {
      return student["name"].includes(name);
    });

    setStudentData(filteredData);
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
      <div>
        <Search
          style={{ width: "30%" }}
          placeholder="search by name"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <br />
      <Table columns={Columns} dataSource={studentData} onChange={onChange} />
    </React.Fragment>
  );
}

export default StudentList;
