import type { Meta, StoryObj } from '@storybook/react';
import TotalLeadLine from '../app/components/Dashboard/TotalLeadLine';
import { chartData } from '../app/components/Path/TaskData'; // Import the chart data here
import "../app/globals.css";

const meta: Meta<typeof TotalLeadLine> = {
  title: 'Components/TotalLeadLine', // Title for Storybook
  component: TotalLeadLine,
  tags: ['autodocs'],
  argTypes: {
    chartData: {
      control: 'object',
      description: 'Data to render in the chart',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TotalLeadLine>;

export const Default: Story = {
  args: {
    chartData: chartData,
  },
};


