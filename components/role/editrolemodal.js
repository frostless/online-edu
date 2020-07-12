import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import { Modal, Button, TreeSelect, Form, Input } from "antd";
import { getMenus } from "./roleservice";

function EditRoleModal(props) {
  const { visible, toggleModal, roleID, handleRoleAdded } = props;
  const isNewRole = !roleID;
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const [menus, setMenus] = useState();
  useEffect(() => {
    setMenus(getMenus());
  }, []);

  useEffect(() => {
    if (isNewRole) return;

    const fetchData = async () => {
      setLoading(true);
      API.getRole(roleID).then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          setLoading(false);
          return;
        }

        const role = res.data.datas[0];
        form.setFieldsValue(role);
        setLoading(false);
      });
    };
    fetchData();
  }, [visible]);

  const onFinish = async (input) => {
    setLoading(true);
    
    const { name } = input;
    let role = makeRole(input);

    let res;
    if (isNewRole) {
      res = await API.addRole(role);
    } else {
      res = await API.updateRole(role);
    }

    let success = API.CheckAPIResult(res);
    if (!success) {
      Notification.notify(`Role ${name} ${isNewRole ? "Added": "Edited"} Failed, Error Code: ${res['code']}, Error Message: ${res['msg']}`);
      setLoading(false);
      return;
    }

    Notification.notify(
      `Role ${isNewRole ? "Added": "Edited"} Successful`,
      `Role ${name} has been ${isNewRole ? "added": "edited"} successfully`
    );

    setLoading(false);
    toggleModal();
    // Refresh parent role list
    handleRoleAdded();
    resetForm();
  };

  const makeRole= (input) => {
    if (!isNewRole) {
      input["id"] = roleID;
    }
    return input;
  };

  const resetForm = () => {
    form.resetFields();
  }

  return (
    <Modal
      visible={visible}
      title={isNewRole ? "Add Role" : "Edit Role"}
      onCancel={() => {
        toggleModal();
        resetForm();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            toggleModal();
            resetForm();
          }}
        >
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
      <Form form={form} name="addrole" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input role name!",
            },
          ]}
        >
          <Input type="text" placeholder="name" />
        </Form.Item>
        <Form.Item
          name="menu"
          rules={[
            {
              required: true,
              pattern: new RegExp("^(?!Menu$)"),
              message: "Please select at least a valid menu!",
            },
          ]}
        >
          <TreeSelect
            showSearch
            style={{ width: "100%" }} 
            placeholder="Menu"
            allowClear
            multiple
            treeDefaultExpandAll
          >
            {menus}
          </TreeSelect>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditRoleModal;