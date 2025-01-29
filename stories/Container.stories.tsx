import type { Meta, StoryObj } from '@storybook/react';
import Container from '../app/microComponents/Container'; 
import "../app/globals.css";

//👇 This default export determines where your story goes in the Storybook sidebar
const meta: Meta<typeof Container> = {
  title: 'Components/Container',  // Storybook category and name
  component: Container,
  tags: ['autodocs'], 
  argTypes: {
    containerWidth: { control: 'text' }, 
    containerHeight: { control: 'text' }, 
    title: { control: 'text' },  
    logo: { control: 'text' },   
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

//👇 Default story with example props
export const Contact_Details: Story = {
  args: {
    containerWidth: '823px',    
    containerHeight: '208px',   
    title: 'Contact Details',     
    logo: 'edit_icon.svg',  
  },
};

export const Pipeline_Stages: Story = {
    args: {
      containerWidth: '823px',    
      containerHeight: '208px',  
      title: 'Pipeline Stages',     
      logo: '',  
      
    },
  };

  export const Activity_Timeline: Story = {
    args: {
      containerWidth: '823px',    
      containerHeight: '315px',  
      title: 'Activity Timeline',     
      logo: '',  

    },
  };

  export const Lead_Information: Story = {
    args: {
      containerWidth: '401px',    
      containerHeight: '235px',  
      title: 'Lead Information',     
      logo: '',  
   
    },
  };

  export const Documents: Story = {
    args: {
      containerWidth: '401px',    
      containerHeight: '213px',  
      title: 'Documents',     
      logo: 'plus_icon.svg',  

    },
  };

  export const Notes: Story = {
    args: {
      containerWidth: '401px',    
      containerHeight: '213px',  
      title: 'Notes',     
      logo: 'plus_icon.svg',  

    },
  };
