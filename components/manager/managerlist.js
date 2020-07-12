import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { Table, Space, Popconfirm, message ,Button } from 'antd';
import EditManagerModal from "./editmanagermodal";
import SearchBar from "../searchbar";
import Helper from "../../lib/helper"

const { Column } = Table;

function  ManagerList() {
  const [managerData, setManagerData] = useState([]);

  const [search, setSearch] = useState();
  const onSearch = (value) => {
    setPagination({...pagination, current: 1});
    setSearch(value);
  };

  const [managerID, setManagerID] = useState();
  const [updateCounter, setUpdateCounter] = useState(0);
  const handleManagerdded = () => {
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
    API.getManagerList(params).then((res) => {
      let success = API.CheckAPIResult(res);
      if (!success) {
        setLoading(false);
        return;
      }
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          role: item["role"]["name"],
          name: item["nickname"]
        };
      });
      setPagination({
        ...pagination,
        total: res.data["pager"]["rowcount"],
      });
      setManagerData(data);
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchData();
  }, [updateCounter, search]);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    if (modalVisible) {
      setManagerID();
    }
    setModalVisible(!modalVisible);
  };

  const onDelete = async (manager) => {
    const res = await API.deleteManager({ id: manager["id"] });
    let success = API.CheckAPIResult(res);
    if (!success) {
      message.error(`Error occured: ${res['msg']}`);
      return;
    }
    message.success('Manager Deleted');
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
          Add Manager
        </Button>
      </div>
      <br />
      <EditManagerModal
        visible={modalVisible}
        handleManagerAdded={handleManagerdded}
        toggleModal={toggleModal}
        managerID={managerID}
      />
      <div style={{ width: "30%" }}>
        <SearchBar placeHolder="search by name" onSearch={onSearch} />
      </div>
      <br />
      <Table dataSource={managerData} onChange={onTableChange} loading={loading} pagination={pagination}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) => a["name"].localeCompare(b["name"])}
        />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
              <a
                onClick={() => {
                  toggleModal();
                  setManagerID(record["id"]);
                }}
              >
                Edit
              </a>
              <Popconfirm
                title="Are you sure to delete this manager?"
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

export default ManagerList;