import type { Meta, StoryObj } from "@storybook/react";
import Meetings from "../app/components/Dashboard/Meetings"; // Adjust the path as needed


// Sample Data for Storybook
const meetingsData = [
  { title: "Team Standup", time: "10:00 AM" },
  { title: "Client Call", time: "2:00 PM" },
];

const recentData = [
  { name: "John Doe", message: "Meeting summary available" },
  { name: "Jane Smith", message: "Follow-up on project updates" },
];

const meta: Meta<typeof Meetings> = {
  title: "Components/Meetings",
  component: Meetings,
  tags: ["autodocs"],
  argTypes: {
    meetings: { control: "object", description: "List of today's meetings" },
    recent: { control: "object", description: "List of recent meetings" },
  },
};

export default meta;

type Story = StoryObj<typeof Meetings>;

export const Default: Story = {
  args: {
    meetings: meetingsData, // Today's meetings
    recent: recentData, // Recent meetings
  },
};

export const NoMeetings: Story = {
  args: {
    meetings: [], // No meetings today
    recent: [], // No recent meetings
  },
};
