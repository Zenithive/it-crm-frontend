import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import HeaderButtons from "../app/microComponents/HeaderButtons"; // Adjust the path if needed

export default {
  title: "Components/HeaderButtons",
  component: HeaderButtons,
  argTypes: {
    button1Text: { control: "text" },
    button2Text: { control: "text" },
    button1img: { control: "text" },
    button2img: { control: "text" },
    button1width: { control: "text" },
    button2width: { control: "text" },
  },
} as Meta;

const Template: StoryFn<typeof HeaderButtons> = (args) => <HeaderButtons {...args} />;

export const Default = Template.bind({});
Default.args = {
  button1Text: "Cancel",
  button2Text: "Submit",
  button1img: "/cancel_icon.svg", // Provide a valid icon path
  button2img: "/submit_icon.svg", // Provide a valid icon path
  button1width: "w-[120px]",
  button2width: "w-[150px]",
};

