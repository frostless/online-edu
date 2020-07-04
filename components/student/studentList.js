import React, {useEffect, useState} from 'react';
import API from '../../lib/api'
import timeago from '../../lib/timeago'
import { Table, Space, Popconfirm, message  } from 'antd';
import Link from 'next/link'
import SearchBar from "../searchbar";

const { Column } = Table;

let originalData = [];

function StudentList() {
  const [studentData, setStudentData] = useState([]);

  const onSearch = (value) => {
    const newList = originalData.filter((item) => {
      return item["name"].includes(value);
    });
    setStudentData(newList);
  };

  const getSelectedCurriculum = (curriculumArray) => {
    let array = curriculumArray.map((item) => {
      return item["name"];
    });
    return array.toString();
  };

  const [updateCounter, setupdateCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let res = API.getStudentList();
      let success = await API.CheckAPIResult(res);
      if (!success) {
        return;
      }

      res.then((res) => {
        let data = res.data.datas.map((item) => {
          return {
            ...item,
            key: item["id"],
            joinTime: timeago.format(new Date(item["ctime"])),
            selectedCurriculum: getSelectedCurriculum(item["courses"]),
            studentType: item["type_name"],
          };
        });
        originalData = data;
        setStudentData(data);
        setLoading(false);
      });
    }

    fetchData();
  }, [updateCounter]);

  const onChange = (pagination, filters, sorter, extra) => {
    //   console.log("params", pagination, filters, sorter, extra);
  };

  const onDelete = async (student) => {
    await API.deleteStudent({ id: student["id"] });
    message.success('Student Deleted');
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
      <Table dataSource={studentData} onChange={onChange} loading={loading}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) => a["name"].localeCompare(b["name"])}
        />
        <Column
          title="Area"
          dataIndex="address"
          key="address"
          width="10%"
          filters={[
            { text: "加拿大", value: "加拿大" },
            { text: "澳洲", value: "澳洲" },
            { text: "国内", value: "国内" },
          ]}
          onFilter={(value, record) => record.address.includes(value)}
        />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Selected Curriculum"
          dataIndex="selectedCurriculum"
          key="selectedCurriculum"
          width="25%"
        />
        <Column
          title="Student Type"
          dataIndex="studentType"
          key="studentType"
          width="15%"
          filters={[
            { text: "开发", value: "开发" },
            { text: "测试", value: "测试" },
          ]}
          onFilter={(value, record) => record.studentType.includes(value)}
        />
        <Column title="Join Time" dataIndex="joinTime" key="joinTime" />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
              <Link href={`/student/editstudent?id=${record["id"]}`}>
                <a>Edit</a>
              </Link>
              <Popconfirm
                title="Are you sure delete this student?"
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

export default StudentList;