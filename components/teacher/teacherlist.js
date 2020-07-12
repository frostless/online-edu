import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { Table, Space, Popconfirm, message ,Button } from 'antd';
import EditTeacherModal from "./editteachermodal";
import SearchBar from "../searchbar";
import Helper from "../../lib/helper"

const { Column } = Table;

function  TeacherList() {
  const [teacherData, setTeacherData] = useState([]);

  const [search, setSearch] = useState();
  const onSearch = (value) => {
    setPagination({...pagination, current: 1});
    setSearch(value);
  };

  const [teacherID, setTeacherID] = useState();
  const [updateCounter, setUpdateCounter] = useState(0);
  const handleTeacherAdded = () => {
    setUpdateCounter(updateCounter + 1);
  };

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, showSizeChanger: true });

  const fetchData = async () => {
    setLoading(true);
    let params = Helper.paginationToUrlObject(pagination);
    if (search) {
      params['kw'] = search;
    }
    API.getTeacherist(params).then((res) => {
      let success = API.CheckAPIResult(res);
      if (!success) {
        setLoading(false);
        return;
      }
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
        };
      });
      setPagination({
        ...pagination,
        total: res.data["pager"]["rowcount"],
      });
      setTeacherData(data);
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchData();
  }, [updateCounter, search]);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    if (modalVisible) {
      setTeacherID();
    }
    setModalVisible(!modalVisible);
  };

  const onDelete = async (teacher) => {
    const res = await API.deleteTeacher({ id: teacher["id"] });
    let success = API.CheckAPIResult(res);
    if (!success) {
      message.error(`Error occured: ${res['msg']}`);
      return;
    }
    message.success('Teacher Deleted');
    setUpdateCounter(updateCounter + 1);
  };

  const onTableChange = (pagination, filters, sorter, extra) => {
    setPagination(pagination);
    setUpdateCounter(updateCounter + 1);
  }

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={toggleModal}>
          Add Teacher
        </Button>
      </div>
      <br />
      <EditTeacherModal
        visible={modalVisible}
        handleTeacherAdded={handleTeacherAdded}
        toggleModal={toggleModal}
        teacherID={teacherID}
      />
      <div style={{ width: "30%" }}>
        <SearchBar placeHolder="search by name" onSearch={onSearch} />
      </div>
      <br />
      <Table dataSource={teacherData} onChange={onTableChange} loading={loading} pagination={pagination}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) => a["name"].localeCompare(b["name"])}
        />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
              <a
                onClick={() => {
                  toggleModal();
                  setTeacherID(record["id"]);
                }}
              >
                Edit
              </a>
              <Popconfirm
                title="Are you sure to delete this teacher?"
                onConfirm={() => {
                  onDelete(record);
                }}
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

export default TeacherList;