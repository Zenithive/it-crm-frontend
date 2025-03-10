"use client";
import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, message } from "antd";
import {createTask} from "../api/apiService/createTaskModalApiService"; 
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const { Option } = Select;

interface CreateTaskModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const user = useSelector((state: RootState) => state.auth);

  const handleCancel = () => setVisible(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await createTask(values, user.token);
      form.resetFields();
      setVisible(false);
      message.success("Task created successfully!");
    } catch (error) {
      message.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Task"
      visible={visible}
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
  );
};


export default CreateTaskModal;
