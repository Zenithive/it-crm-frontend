import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Pagination from "../app/microComponents/Pagination"; // Adjust the path if needed

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    totalItems: { control: { type: "number", min: 1 }, defaultValue: 50 },
    initialItemsPerPage: { control: { type: "number", min: 1 }, defaultValue: 3 },
    onPageChange: { action: "page changed" },
    onItemsPerPageChange: { action: "items per page changed" },
  },
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalItems: 50,
  initialItemsPerPage: 3,
};

export const ManyItems = Template.bind({});
ManyItems.args = {
  totalItems: 200,
  initialItemsPerPage: 10,
};

export const FewItems = Template.bind({});
FewItems.args = {
  totalItems: 10,
  initialItemsPerPage: 2,
};

