import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import { Modal, Button, Select, Form, Input } from "antd";

function EditManagerModal(props) {
  const { visible, toggleModal, managerID, handleManagerAdded } = props;
  const isNewManager = !managerID;
  const [loading, setLoading] = useState(false);

  const { Option } = Select;
  const [form] = Form.useForm();

  const [roleList, setRoleList] = useState([]);
  useEffect(() => {
    if (!visible) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      API.getManagerRoleList().then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          setLoading(false);
          return;
        }
        let roleList = [];
        res.data.datas.forEach((element) => {
          const { id, name } = element;
          const option = (
            <Option key={id} value={id}>
              {name}
            </Option>
          );
          roleList.push(option);
        });
        setRoleList(roleList);
        if (isNewManager){
          setLoading(false);
        }
      });
    };
    fetchData();
  }, [visible]);

  useEffect(() => {
    if (isNewManager) return;

    const fetchData = async () => {
      API.getManager(managerID).then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          setLoading(false);
          return;
        }

        const manager = res.data.datas[0];
        form.setFieldsValue(manager);
        setLoading(false);
      });
    };
    fetchData();
  }, [visible]);

  const onFinish = async (input) => {
    setLoading(true);
    
    const { nickname } = input;
    let manager = makeManager(input);
    let res;
    if (isNewManager) {
      res = await API.addManager(manager);
    } else {
      res = await API.updateManager(manager);
    }

    let success = API.CheckAPIResult(res);
    if (!success) {
      Notification.notify(`Manager ${nickname} ${isNewManager ? "Added": "Edited"} Failed, Error Code: ${res['code']}, Error Message: ${res['msg']}`);
      setLoading(false);
      return;
    }

    Notification.notify(
      `Manager ${isNewManager ? "Added": "Edited"} Successful`,
      `Manager ${nickname} has been ${isNewManager ? "added": "edited"} successfully`
    );

    setLoading(false);
    toggleModal();
    // Refresh parent student course list
    handleManagerAdded();
    resetForm();
  };

  const makeManager = (input) => {
    if (!isNewManager) {
      input["id"] = managerID;
    }
    return input;
  };

  const resetForm = () => {
    form.resetFields();
  }

  return (
    <Modal
      visible={visible}
      title={isNewManager ? "Add Manager" : "Edit Manager"}
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
      <Form form={form} name="addmanager" onFinish={onFinish}>
        <Form.Item
          name="nickname"
          rules={[
            {
              required: true,
              message: "Please input manager name!",
            },
          ]}
        >
          <Input type="text" placeholder="nickname" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input manager email!",
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
              message: "Please input manager password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="role_id"
          initialValue="Role Selection"
          rules={[
            {
              required: true,
              pattern: new RegExp("^(?!Role Selection$)"),
              message: "Please select a valid role!",
            },
          ]}
        >
          <Select style={{ width: "100%" }}> {roleList} </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditManagerModal;