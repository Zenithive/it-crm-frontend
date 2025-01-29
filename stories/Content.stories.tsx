import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Content, { Data1Props } from "../app/microComponents/Content";

export default {
  title: "Components/Content",
  component: Content,
  tags: ['autodocs'], 
  argTypes: {
    profileImage: {
      control: "text",
      description: "URL of the profile image",
    },
    name: {
      control: "text",
      description: "Name of the individual",
    },
    designation: {
      control: "text",
      description: "Designation or subtitle for the individual",
    },
    nameStyle: {
      control: "text",
      description: "Additional styles for the name text",
    },
    otherStyle: {
      control: "text",
      description: "Additional styles for the designation text",
    },
  },
} as Meta;

type Story = StoryObj<typeof Content>;

export const Content1: Story = {
  args: {
    profileImage: "profileLogo.svg",
    name: "John Doe",
    designation: "Software Engineer",
    nameStyle: "text-[18px] font-bold",
    otherStyle: "text-[14px]",
  },
};
