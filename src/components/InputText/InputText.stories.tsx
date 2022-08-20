import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputText from "./InputText";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/InputText",
  component: InputText,
} as ComponentMeta<typeof InputText>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputText> = (args) => (
  <InputText {...args} />
);

export const withExistingText = Template.bind({});
export const noColon = Template.bind({});
export const blank = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
withExistingText.args = {
  label: "My Label!",
  text: "Example text",
};

noColon.args = {
  label: "My Label!",
  text: "Example text",
  colon: false,
};

blank.args = {};
