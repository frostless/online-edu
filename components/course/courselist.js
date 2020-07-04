import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import timeago from '../../lib/timeago'
import { Table, Space, Popconfirm, message } from 'antd';
import Link from 'next/link'
import SearchBar from "../searchbar";

const { Column } = Table;

let originalData = [];

function CourseList() {
  const [courseData, setCourseData] = useState([]);

  const onSearch = (value) => {
    const newList = originalData.filter((item) => {
      return item["name"].includes(value);
    });
    setCourseData(newList);
  };

  const [updateCounter, setupdateCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let res = API.getCourseList();
      let success = await API.CheckAPIResult(res);
      if (!success) {
        return;
      }

      res.then((res) => {
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
        setLoading(false);
      });
    }
    fetchData();
  }, [updateCounter]);

  const onChange = (pagination, filters, sorter, extra) => {
    //   console.log("params", pagination, filters, sorter, extra);
  };

  const onDelete = async (course) => {
    await API.deleteCourse({ id: course["id"] });
    message.success('Course Deleted');
    setupdateCounter(updateCounter + 1);
  };

  return (
    <React.Fragment>
      <div style={{ width: "30%" }}>
        <SearchBar
          placeHolder="search by name"
          onSearch={onSearch}
        />
      </div>
      <br />
      <Table dataSource={courseData} onChange={onChange} loading={loading}>
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
              <Link href={`/course/editcourse?id=${record["id"]}`}>
                <a>Edit</a>
              </Link>
              <Popconfirm
                title="Are you sure delete this course?"
                onConfirm={()=>{onDelete(record)}}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
}

export default CourseList;
