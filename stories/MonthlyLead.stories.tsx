import type { Meta, StoryObj } from "@storybook/react";
import MonthlyLead from "../app/components/Dashboard/MonthlyLead"; // Adjust path as needed

const meta: Meta<typeof MonthlyLead> = {
  title: "Components/MonthlyLead",
  component: MonthlyLead,
  tags: ["autodocs"],
  argTypes: {
    onTimeFilterChange: { action: "timeFilterChanged" },
    currentTimeFilter: { 
      control: "select", 
      options: ["today", "last7days", "last15days", "last30days", "weekly", "monthly", "quarterly", "half-yearly", "yearly", "custom"],
      description: "Current time filter selection"
    },
    defaultTimeFilter: {
      control: "select", 
      options: ["today", "last7days", "last15days", "last30days", "weekly", "monthly", "quarterly", "half-yearly", "yearly", "custom"],
      description: "Default time filter to use"
    }
  },
};

export default meta;

type Story = StoryObj<typeof MonthlyLead>;

// Default story
export const Default: Story = {
  args: {
    defaultTimeFilter: "monthly",
  }
};

// With different time filter
export const WithCustomTimeFilter: Story = {
  args: {
    currentTimeFilter: "quarterly",
    defaultTimeFilter: "monthly",
  }
};

// Mock the environment variable for testing with dummy data
// Note: This won't work directly in Storybook without additional setup
export const WithDummyData: Story = {
  args: {
    defaultTimeFilter: "monthly",
  },
  parameters: {
    mockData: {
      env: {
        NEXT_PUBLIC_USE_DUMMY_DATA: "true"
      }
    }
  }
};