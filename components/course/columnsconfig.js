import { Space } from "antd";
import Link from 'next/link'

const nameColumn = "name";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: nameColumn,
    key: nameColumn,
    sorter: (a, b) => a[nameColumn].localeCompare(b[nameColumn]),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
      <Link href={`/course/editcourse?id=${record["id"]}`}><a>Edit</a></Link>
      <a>Delete</a>
    </Space>
    ),
  },
];

const placeHolder = "search by name";
const filterColumn = nameColumn;
export { columns, filterColumn, placeHolder };