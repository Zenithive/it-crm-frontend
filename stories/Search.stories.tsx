import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Search from "../app/microComponents/Search"; // Adjust the path if needed

export default {
  title: "Components/Search",
  component: Search,
  argTypes: {
    searchText: { control: "text", defaultValue: "Search here..." },
  },
} as Meta<typeof Search>;

const Template: StoryFn<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchText: "Search for items...",
};

export const WithCustomPlaceholder = Template.bind({});
WithCustomPlaceholder.args = {
  searchText: "Search products...",
};
