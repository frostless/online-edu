import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import { Modal, Button, Form, Input } from "antd";

function EditCourseTypeModal(props) {
  const { visible, toggleModal, courseTypeID, handleCourseTypeAdded } = props;
  const isNewCourseType = !courseTypeID;
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (isNewCourseType) return;

    const fetchData = async () => {
      setLoading(true);
      API.getCourseType(courseTypeID).then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          setLoading(false);
          return;
        }

        const courseType = res.data.datas[0];
        form.setFieldsValue(courseType);
        setLoading(false);
      });
    };
    fetchData();
  }, [visible]);

  const onFinish = async (input) => {
    setLoading(true);
    
    const { name } = input;
    let courseType = makeCourseType(input);

    let res;
    if (isNewCourseType) {
      res = await API.addCourseType(courseType);
    } else {
      res = await API.updateCourseType(courseType);
    }

    let success = API.CheckAPIResult(res);
    if (!success) {
      Notification.notify(`Course Type ${name} ${isNewCourseType ? "Added": "Edited"} Failed, Error Code: ${res['code']}, Error Message: ${res['msg']}`);
      setLoading(false);
      return;
    }

    Notification.notify(
      `Course Type ${isNewCourseType ? "Added": "Edited"} Successful`,
      `Course Type ${name} has been ${isNewCourseType ? "added": "edited"} successfully`
    );

    setLoading(false);
    toggleModal();
    // Refresh parent course type list
    handleCourseTypeAdded();
    resetForm();
  };

  const makeCourseType= (input) => {
    if (!isNewCourseType) {
      input["id"] = courseTypeID;
    }
    return input;
  };

  const resetForm = () => {
    form.resetFields();
  }

  return (
    <Modal
      visible={visible}
      title={isNewCourseType ? "Add Course Type" : "Edit Course Type"}
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
      <Form form={form} name="addcoursetype" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input course type name!",
            },
          ]}
        >
          <Input type="text" placeholder="name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditCourseTypeModal;