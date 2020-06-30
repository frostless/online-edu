import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import timeago from '../../lib/timeago'
import { Table, Space } from 'antd';
import Link from 'next/link'
import SearchBar from "../searchbar";

const { Column } = Table;

let originalData = [];

function CourseList() {
  const [courseData, setCourseData] = useState([]);

  const updateList = (newList) => {
    setCourseData(newList);
  };

  const [updateCounter, setupdateCounter] = useState(0);

  useEffect(() => {
    API.getCourseList().then((res) => {
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          type: item["type_name"],
          createdAt: timeago.format(new Date(item["ctime"]))
        };
      });
      originalData = data;
      setCourseData(data);
    });
  }, [updateCounter]);

  const onChange = (pagination, filters, sorter, extra) => {
    //   console.log("params", pagination, filters, sorter, extra);
  };

  const onDelete = async (course) => {
    await API.deleteCourse({ id: course["id"] });
    setupdateCounter(updateCounter + 1);
  };

  return (
    <React.Fragment>
      <div style={{ width: "30%" }}>
        <SearchBar
          updateList={updateList}
          filterColumn="name"
          placeHolder="search by name"
          oldList={originalData}
        />
      </div>
      <br />
      <Table dataSource={courseData} onChange={onChange}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) => a["name"].localeCompare(b["name"])}
        />
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Created At" dataIndex="createdAt" key="createdAt" />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
            <Link href={`/course/editcourse?id=${record["id"]}`}><a>Edit</a></Link>
            <a onClick={()=>{onDelete(record)}}>Delete</a>
          </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
}

export default CourseList;
