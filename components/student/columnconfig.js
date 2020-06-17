import { Space } from "antd";

const Columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Area",
    dataIndex: "area",
    key: "area",
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
    key: "Join Time",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default Columns
