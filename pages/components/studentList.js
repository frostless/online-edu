import React, {useEffect, useState} from 'react';
import API from '../lib/API'
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

const data = [
  {
    student_id: 64,
    student_name: "jenney@student.com",
    update_date: "2020-04-29T10:43:11.000Z",
    adress: "澳洲",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 57,
    student_name: "text",
    update_date: "2020-03-27T13:04:02.000Z",
    adress: "国内",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 63,
    student_name: "lip",
    update_date: "2020-03-20T13:39:28.000Z",
    adress: "国内",
    type_id: 1,
    course_type: "测试",
    course_id: 32,
    course_name: "android01",
  },
  {
    student_id: 62,
    student_name: "laji",
    update_date: "2020-03-20T13:38:44.000Z",
    adress: "国内",
    type_id: 2,
    course_type: "开发",
    course_id: 31,
    course_name: "react01",
  },
  {
    student_id: 61,
    student_name: "shawn",
    update_date: "2020-03-20T08:19:04.000Z",
    adress: "国内",
    type_id: 2,
    course_type: "开发",
    course_id: 29,
    course_name: "js第一课",
  },
  {
    student_id: 58,
    student_name: "huipei",
    update_date: "2020-03-19T11:48:54.000Z",
    adress: "国内",
    type_id: 2,
    course_type: "开发",
    course_id: 9,
    course_name: "ios第3课",
  },
  {
    student_id: 56,
    student_name: "green",
    update_date: "2020-03-17T18:10:19.000Z",
    adress: "加拿大",
    type_id: 2,
    course_type: "开发",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 55,
    student_name: "rick",
    update_date: "2020-03-16T06:46:48.000Z",
    adress: "澳洲",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 53,
    student_name: "铁憨憨",
    update_date: "2020-03-16T06:01:08.000Z",
    adress: "澳洲",
    type_id: 2,
    course_type: "开发",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 54,
    student_name: "xiaowang",
    update_date: "2020-03-15T15:18:50.000Z",
    adress: "加拿大",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 47,
    student_name: "憨憨",
    update_date: "2020-03-12T16:52:05.000Z",
    adress: "新西兰",
    type_id: 2,
    course_type: "开发",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 32,
    student_name: "eric",
    update_date: "2020-03-12T05:55:11.000Z",
    adress: "新西兰",
    type_id: 2,
    course_type: "开发",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 49,
    student_name: "dsdsdsds",
    update_date: "2020-03-10T07:09:53.000Z",
    adress: "国内",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 46,
    student_name: "sdsdsdsdsdsd",
    update_date: "2020-03-10T07:09:31.000Z",
    adress: "新西兰",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 45,
    student_name: "sdsdsds",
    update_date: "2020-03-10T07:09:29.000Z",
    adress: "新西兰",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 44,
    student_name: "wzz",
    update_date: "2020-03-10T06:06:21.000Z",
    adress: "澳洲",
    type_id: 2,
    course_type: "开发",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 38,
    student_name: "wangzhzh",
    update_date: "2020-03-09T13:19:25.000Z",
    adress: "国内",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 35,
    student_name: "glad",
    update_date: "2020-01-15T13:44:55.000Z",
    adress: "国内",
    type_id: 2,
    course_type: "开发",
    course_id: 1,
    course_name: "测试课程1",
  },
  {
    student_id: 1,
    student_name: "admin",
    update_date: "2020-01-10T12:22:19.000Z",
    adress: "新西兰",
    type_id: 1,
    course_type: "测试",
    course_id: 1,
    course_name: "测试课程1",
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
    obj["joinTime"] = input[i].update_date;
    data.push(obj);
  }

  return data;
};

// Hardcode the data for now as the API does not yet return the data
const hardCodeData = dataMapping(data);

const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
};

function StudentList() {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    // API.getStudentList()
    // .then(res => {
    //     console.log(res)
    // })
    setStudentData(hardCodeData);
  });

  return (
    <Table columns={columns} dataSource={studentData} size="small" onChange={onChange} />
  );
}

export default StudentList;
