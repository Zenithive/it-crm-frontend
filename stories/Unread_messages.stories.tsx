import type { Meta, StoryObj } from "@storybook/react";
import UnreadMessages from "../app/components/Dashboard/UnreadMessages";
import { unread_messages } from "../app/components/Path/TaskData"; // Import test data
// import "../globals.css";

const meta: Meta<typeof UnreadMessages> = {
  title: "Components/UnreadMessages",
  component: UnreadMessages,
  argTypes: {
    unread_messages: {
      control: "object",
      description: "Array of unread messages",
    },
  },
};

export default meta;

type Story = StoryObj<typeof UnreadMessages>;

export const Default: Story = {
  args: {
    unread_messages: unread_messages, // Pass data as props
  },
};

export const EmptyMessages: Story = {
  args: {
    unread_messages: [], // No messages
  },
};
