import React, {useEffect, useState} from 'react';
import API from '../../lib/api'
import Columns from "./columnsconfig";
import { Table } from 'antd';

const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
};

function CourseList() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    API.getCourseList().then((res) => {
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          type: item["type_name"],
        };
      });
      setCourseData(data);
    });
  }, []);

  return (
    <React.Fragment>
      <Table columns={Columns} dataSource={courseData} onChange={onChange} />
    </React.Fragment>
  );
}

export default CourseList;
