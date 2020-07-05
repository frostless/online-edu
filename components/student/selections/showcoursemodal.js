import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "antd";
import API from "../../../lib/api";

const { Column } = Table;

function ShowCoueseModal(props) {
  const { visible, query, toggleModal } = props;
  const [loading, setLoading] = useState(false);
  const [studentCourseDate, setStudentCourseData] = useState();

  useEffect(() => {
    if (!visible) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      API.getStudentCourseList(query).then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          return;
        }
        let data = res.data.datas.map((item) => {
          return {
            ...item,
            key: item["id"],
          };
        });
        setStudentCourseData(data);
        setLoading(false);
      });
    };
    fetchData();
  }, [visible, query]);

  return (
    <Modal
      visible={visible}
      title="Selection Detail"
      onCancel={toggleModal}
      footer={[
        <Button key="ok" type="primary" onClick={toggleModal}>
          OK
        </Button>,
      ]}
    >
      <Table dataSource={studentCourseDate} loading={loading}>
        <Column title="Name" dataIndex="student_name" key="student_name" />
        <Column title="Course" dataIndex="course_name" key="course_name" />
      </Table>
    </Modal>
  );
}

export default ShowCoueseModal;