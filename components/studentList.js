import React, {useEffect, useState} from 'react';
import API from '../lib/API'
import Helper from '../lib/Helper'
import { Table, Space } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Area',
    dataIndex: 'area',
    key: 'area',
    width: '10%',
    filters: [
      { text: '加拿大', value: '加拿大' },
      { text: '澳洲', value: '澳洲' },
      { text: '国内', value: '国内' },
    ],
    onFilter: (value, record) => record.area.includes(value),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Selected Curriculum',
    dataIndex: 'selectedCurriculum',
    key: 'selectedCurriculum',
    width: '25%'
  },
  {
    title: 'Student Type',
    dataIndex: 'studentType',
    key: 'studentType',
    filters: [
      { text: '开发', value: '开发' },
      { text: '测试', value: '测试' },
    ],
    onFilter: (value, record) => record.studentType.includes(value),
    width: '15%'
  },
  {
    title: 'Join Time',
    dataIndex: 'joinTime',
    key: 'Join Time',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const dataMapping = (input) => {
  const data = [];
  if (!Array.isArray(input)) return data;
  if (input.length === 0) return data;

  for (let i = 0; i < input.length; i++) {
    let obj = {};
    obj["key"] = input[i].student_id;
    obj["id"] = input[i].student_id;
    obj["name"] = input[i].student_name;
    obj["area"] = input[i].adress;
    obj["selectedCurriculum"] = input[i].course_name;
    obj["studentType"] = input[i].course_type;
    obj["joinTime"] = Helper.formatDate(input[i].update_date);
    data.push(obj);
  }

  return data;
};

const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
};

function StudentList() {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    API.getStudentList()
    .then(res => {
      let data = res.data.datas;
      data = dataMapping(data)
      setStudentData(data)
    })
  }, []);

  return (
    <Table columns={columns} dataSource={studentData} onChange={onChange} />
  );
}

export default StudentList;
