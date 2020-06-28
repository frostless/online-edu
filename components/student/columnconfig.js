import { Space } from "antd";
import Link from 'next/link'

const listNameColumn = "name";
const listColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: listNameColumn,
    key: listNameColumn,
    sorter: (a, b) => a[listNameColumn].localeCompare(b[listNameColumn]),
  },
  {
    title: "Area",
    dataIndex: "address",
    key: "address",
    width: "10%",
    filters: [
      { text: "加拿大", value: "加拿大" },
      { text: "澳洲", value: "澳洲" },
      { text: "国内", value: "国内" },
    ],
    onFilter: (value, record) => record.area.includes(value),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Selected Curriculum",
    dataIndex: "selectedCurriculum",
    key: "selectedCurriculum",
    width: "25%",
  },
  {
    title: "Student Type",
    dataIndex: "studentType",
    key: "studentType",
    filters: [
      { text: "开发", value: "开发" },
      { text: "测试", value: "测试" },
    ],
    onFilter: (value, record) => record.studentType.includes(value),
    width: "15%",
  },
  {
    title: "Join Time",
    dataIndex: "joinTime",
    key: "joinTime",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link href={`/student/editstudent?id=${record["id"]}`}><a>Edit</a></Link>
        <a>Delete</a>
      </Space>
    ),
  },
];

const listPlaceHolder = "search by name";
const listFilterColumn = listNameColumn;
export { listColumns, listFilterColumn, listPlaceHolder };


const selectionNameColumn = "student_name";
const selectionColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: selectionNameColumn,
    key: selectionNameColumn,
    sorter: (a, b) => a[selectionNameColumn].localeCompare(b[selectionNameColumn]),
  },
  {
    title: "Selected Course",
    dataIndex: "course_name",
    key: "course_name"
  },
  {
    title: "Course date",
    dataIndex: "course_date",
    key: "course_date"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link href={`/student/editstudentcourse?id=${record["id"]}`}><a>Edit</a></Link>
        <a>Delete</a>
      </Space>
    ),
  },
];

const selectionPlaceHolder = "search by name";
const selectionFilterColumn = selectionNameColumn;
export { selectionColumns, selectionFilterColumn, selectionPlaceHolder };
