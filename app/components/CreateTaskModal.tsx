"use client";
import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import useCreateTask from "../api/apiService/createTaskModalApiService";

const { Option } = Select;

const CreateTaskModal = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { createTask, loading } = useCreateTask(); // Using custom hook

  const user = useSelector((state: RootState) => state.auth);

  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const handleSubmit = async (values: any) => {
    try {
      await createTask(values);
      form.resetFields();
      setVisible(false);
    } catch (error) {
      message.error("Failed to create task");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create Task
      </Button>
      <Modal
        title="Create Task"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="TODO">To Do</Option>
              <Option value="IN_PROGRESS">In Progress</Option>
              <Option value="COMPLETED">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="LOW">Low</Option>
              <Option value="MEDIUM">Medium</Option>
              <Option value="HIGH">High</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;