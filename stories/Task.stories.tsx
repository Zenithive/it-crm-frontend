import type { Meta, StoryObj } from '@storybook/react';
import Task from '../app/components/Dashboard/Task';
import "../app/globals.css";

const meta: Meta<typeof Task> = {
  title: 'Components/Task', // The name of the component in Storybook
  component: Task,
  tags: ['autodocs'], // Optional, for automatic documentation generation
  argTypes: {
   
    tasks: {
      control: 'object',
      description: 'Array of tasks to display',
    },
    followup: {
      control: 'object',
      description: 'Array of follow-up messages to display',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Task>;

export const TodayTasks: Story = {
  args: {
    tasks: [
      { title: 'Task 1', dueTime: '10:00 AM' },
      { title: 'Task 2', dueTime: '12:00 PM' },
      { title: 'Task 3', dueTime: '02:00 PM' },
    ],
    followup: [],
  },
};

export const FollowUps: Story = {
  args: {
    tasks: [],
    followup: [
      { name: 'John Doe', message: 'Need to follow up on task 1' },
      { name: 'Jane Smith', message: 'Reminder for meeting tomorrow' },
    ],
  },
};
