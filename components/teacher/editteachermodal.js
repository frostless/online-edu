import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import { Modal, Button, Form, Input } from "antd";

function EditTeacherModal(props) {
  const { visible, toggleModal, teacherID, handleTeacherAdded } = props;
  const isNewTeacher = !teacherID;
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (isNewTeacher) return;

    const fetchData = async () => {
      API.getTeacher(teacherID).then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          setLoading(false);
          return;
        }

        const teacher = res.data.datas;
        form.setFieldsValue(teacher);
        setLoading(false);
      });
    };
    fetchData();
  }, [visible]);

  const onFinish = async (input) => {
    setLoading(true);
    
    const { name } = input;
    let teacher = makeTeacher(input);
    let res;
    if (isNewTeacher) {
      res = await API.addTeacher(teacher);
    } else {
      res = await API.updateTeacher(teacher);
    }

    let success = API.CheckAPIResult(res);
    if (!success) {
      Notification.notify(`Teacher ${name} ${isNewTeacher ? "Added": "Edited"} Failed, Error Code: ${res['code']}, Error Message: ${res['msg']}`);
      setLoading(false);
      return;
    }

    Notification.notify(
      `Teacher ${isNewTeacher ? "Added": "Edited"} Successful`,
      `Teacher ${name} has been ${isNewTeacher ? "added": "edited"} successfully`
    );

    setLoading(false);
    toggleModal();
    // Refresh parent teacher list
    handleTeacherAdded();
    resetForm();
  };

  const makeTeacher = (input) => {
    if (!isNewTeacher) {
      input["id"] = teacherID;
    }
    return input;
  };

  const resetForm = () => {
    form.resetFields();
  }

  return (
    <Modal
      visible={visible}
      title={isNewTeacher ? "Add Teacher" : "Edit Teacher"}
      onCancel={() => {toggleModal(); resetForm();}}
      footer={[
        <Button key="back" onClick={() => {toggleModal(); resetForm();}}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={form.submit}
          loading={loading}
        >
          Save
        </Button>,
      ]}
    >
      <Form form={form} name="addteacher" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input teacher name!",
            },
          ]}
        >
          <Input type="text" placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input teacher email!",
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input teacher password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditTeacherModal;