import React, { useEffect, useState } from "react";
import AddCourseModal from "./addcoursemodal";
import { Table, Button, Space } from "antd";
import SearchBar from "../../searchbar";
import Helper from "../../../lib/helper";
import Link from 'next/link'
import API from "../../../lib/api";

const { Column } = Table;

function ListMode() {
  const [studentCourseData, setStudentCourseData] = useState([]);
  const [updateCounter, setUpdateCounter] = useState(0);
  const handleStudentCourseAdded = () => {
    setUpdateCounter(updateCounter + 1);
  };
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, showSizeChanger: true });

  const [search, setSearch] = useState();
  const onSearch = (value) => {
    setSearch(value);
  };

  const fetchData = async () => {
    setLoading(true);
    let params = Helper.paginationToUrlObject(pagination);
    if (search) {
      params = { pagesize: pagination.pageSize, kw: search };
    }
    API.getStudentCourseList(params).then((res) => {
      let success = API.CheckAPIResult(res);
      if (!success) {
        setLoading(false);
        return;
      }
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          course_date: Helper.formatDate(item["course_date"]),
        };
      });
      setPagination({
        ...pagination,
        current: Math.min(++res.data["pager"]["page"], pagination.current),
        total: res.data["pager"]["rowcount"],
      });
      setStudentCourseData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [updateCounter, search]);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onTableChange = (pagination, filters, sorter, extra) => {
    setPagination(pagination);
    setupdateCounter(updateCounter + 1);
  };  

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={toggleModal}>
          Add Course
        </Button>
      </div>
      <br />
      <AddCourseModal
        visible={modalVisible}
        handleStudentCourseAdded={handleStudentCourseAdded}
        toggleModal={toggleModal}
      />
      <div style={{ width: "30%" }}>
        <SearchBar onSearch={onSearch} placeHolder="search by name" />
      </div>
      <br />
      <Table dataSource={studentCourseData} onChange={onTableChange} loading={loading} pagination={pagination}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Name"
          dataIndex="student_name"
          key="student_name"
          sorter={(a, b) => a["student_name"].localeCompare(b["student_name"])}
        />
        <Column
          title="Selected Course"
          dataIndex="course_name"
          key="course_name"
        />
        <Column title="Course date" dataIndex="course_date" key="course_date" />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
              <Link href={`/student/editstudentcourse?id=${record["id"]}`}>
                <a>Edit</a>
              </Link>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
}

export default ListMode;