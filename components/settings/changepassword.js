import React, { useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import styled from "styled-components";
import { Form, Button, Input, Select } from "antd";

// Properties
// End Properties

// Style Components
// End Style Components

function ChangePassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (input) => {
    setLoading(true);
   
    const res = await API.changePassword(input); 

    form.resetFields();

    let success = API.CheckAPIResult(res);
    if (!success) {
      Notification.notify("Password Changed Failed", `Error Code: ${res['code']}, Error Message: ${res['msg']}`);
      setLoading(false);
      return;
    }

    Notification.notify("Password Changed Successful", 
      "You have changed your password successfully");
      setLoading(false);
  };

  return (
    <div style={{ width: "30%" }}>
      <Form name="password" onFinish={onFinish} form={form}>
        <Form.Item
          name="old_password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your old password!",
            },
          ]}
        >
          <Input.Password placeholder="Old password" />
        </Form.Item>
        <Form.Item
          name="repeat_password"
          dependencies={["old_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please repeat your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("old_password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Repeat password" />
        </Form.Item>
        <Form.Item
          name="new_password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your new password!",
            },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangePassword;