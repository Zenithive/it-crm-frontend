import type { Meta, StoryObj } from '@storybook/react';
import Title from '../app/microComponents/Title'; 
import "../app/globals.css";


const meta: Meta<typeof Title> = {
  title: 'Components/Title', 
  component: Title,
  tags: ['autodocs'], 
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title text to display',
    },
    // button: {
    //   control: 'text',
    //   description: 'Text to display inside the button (if any)',
    // },
  },
};

export default meta;

type Story = StoryObj<typeof Title>;


export const Dashboard: Story = {
  args: {
    title: 'Dashboard Title', 
   
  },
};

export const Lead: Story = {
  args: {
    title: 'Lead', 
   
  },
};


export const Individual_Lead: Story = {
  args: {
    title: 'Individual Lead', 
  },
};





