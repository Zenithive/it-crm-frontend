import type { Meta, StoryObj } from "@storybook/react";
import MonthlyLead from "../app/components/Dashboard/MonthlyLead"; // Adjust path as needed


// Sample Data for Storybook
const sampleData = [
  { name: "Closed", value: 60, color: "#6366F1" },
  { name: "Prospect", value: 25, color: "#8B5CF6" },
  { name: "Lead", value: 15, color: "#333" },
];

const meta: Meta<typeof MonthlyLead> = {
  title: "Components/MonthlyLead",
  component: MonthlyLead,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object", description: "Data for the pie chart" },
  },
};

export default meta;

type Story = StoryObj<typeof MonthlyLead>;

export const Default: Story = {
  args: {
    data: sampleData,
  },
};




