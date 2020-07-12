import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { Table, Space, Popconfirm, message ,Button } from 'antd';
import EditRoleModal from "./editrolemodal";
import SearchBar from "../searchbar";
import Helper from "../../lib/helper"

const { Column } = Table;

function  RoleList() {
  const [roleData, setRoleData] = useState([]);

  const [search, setSearch] = useState();
  const onSearch = (value) => {
    setPagination({...pagination, current: 1});
    setSearch(value);
  };

  const getMenus= (menuArray) => {
    return menuArray.join();
  };

  const [roleID, setRoleID] = useState();
  const [updateCounter, setUpdateCounter] = useState(0);
  const handleRoleAdded = () => {
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
    API.getRoleList(params).then((res) => {
      let success = API.CheckAPIResult(res);
      if (!success) {
        setLoading(false);
        return;
      }
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
          menus: getMenus(item["menu"]),
        };
      });
      setPagination({
        ...pagination,
        total: res.data["pager"]["rowcount"],
      });
      setRoleData(data);
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchData();
  }, [updateCounter, search]);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    if (modalVisible) {
      setRoleID();
    }
    setModalVisible(!modalVisible);
  };

  const onDelete = async (role) => {
    const res = await API.deleteRole({ id: role["id"] });
    let success = API.CheckAPIResult(res);
    if (!success) {
      message.error(`Error occured: ${res['msg']}`);
      return;
    }
    message.success('Role Deleted');
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
          Add Role
        </Button>
      </div>
      <br />
      <EditRoleModal
        visible={modalVisible}
        handleRoleAdded={handleRoleAdded}
        toggleModal={toggleModal}
        roleID={roleID}
      />
      <div style={{ width: "30%" }}>
        <SearchBar placeHolder="search by name" onSearch={onSearch} />
      </div>
      <br />
      <Table dataSource={roleData} onChange={onTableChange} loading={loading} pagination={pagination}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Role Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) => a["name"].localeCompare(b["name"])}
        />
        <Column title="Menus" dataIndex="menus" key="menus" />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
              <a
                onClick={() => {
                  toggleModal();
                  setRoleID(record["id"]);
                }}
              >
                Edit
              </a>
              <Popconfirm
                title="Are you sure to delete this role?"
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

export default RoleList;