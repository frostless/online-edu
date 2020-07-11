import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { Table, Space, Popconfirm, message } from 'antd';
import Link from 'next/link'
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

  const [updateCounter, setUpdateCounter] = useState(0);
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
      <div style={{ width: "30%" }}>
        <SearchBar
          placeHolder="search by name"
          onSearch={onSearch}
        />
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
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
              <Link href={`/manager/editmanager?id=${record["id"]}`}>
                <a>Edit</a>
              </Link>
              <Popconfirm
                title="Are you sure to delete this manager?"
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

export default ManagerList;