import { Space } from "antd";
import Link from 'next/link'

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

export default Columns
