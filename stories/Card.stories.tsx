import type { Meta, StoryObj } from '@storybook/react';
import Card from '../app/microComponents/Card'; // Update the path if needed
import "../app/globals.css";

//👇 This default export determines where your story goes in the Storybook sidebar
const meta: Meta<typeof Card> = {
  title: 'Components/Card', // Storybook category and name
  component: Card,
  tags: ['autodocs'], // Enables auto-generated docs
  argTypes: {
    logo: {
      control: 'text',
      description: 'URL of the logo image to be displayed',
    },
    task: {
      control: 'text',
      description: 'Main text to display in the card header',
    },
    lastText: {
      control: 'text',
      description: 'Text displayed on the right side of the card header',
    },
    lastTextColor: {
      control: 'text',
      description: 'CSS class to style the color of the lastText',
    },
    children: {
      control: 'text',
      description: 'Content displayed inside the card body',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

//👇 Default story with example props
export const Todays_Task: Story = {
  args: {
    logo: 'tabler_checkbox.svg', 
    task: `Today's Task`,
    lastText: '5 days ago',
    lastTextColor: 'text-bg-gray-13',
   
  },
};

export const Todays_Meetings: Story = {
    args: {
      logo: 'video.svg', 
      task: `Today's Meetings`,
      lastText: '5 days ago',
      lastTextColor: 'text-bg-gray-13',
     
    },
  };

  export const Time: Story = {
    args: {
      logo: 'cl.svg',
      task: 'Time',
      lastText: '5 days ago',
      lastTextColor: 'text-bg-gray-13',

    },
  };

