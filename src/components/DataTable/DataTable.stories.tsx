import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DataTable from "./DataTable";
import data from "./TestTableData.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/DataTable",
  component: DataTable,
} as ComponentMeta<typeof DataTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DataTable> = (args) => (
  <DataTable {...args} />
);

const activeColumns = [
  { label: "Name", id: "fullName" },
  { label: "Address", id: "address" },
  { label: "Phone Number", id: "phoneNumber" },
  { label: "Email", id: "email" },
];

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
  data,
  activeColumns,
};
