import React from "react";
import { Tabs } from "antd";
import ListMode from "./listmode"
import CalenderMode from "./calendermode"

const { TabPane } = Tabs;

function Home() {
  const onTabChange = (key) => {};

  return (
    <Tabs defaultActiveKey="listMode" onChange={onTabChange}>
      <TabPane tab="List Mode" key="listMode">
        <ListMode />
      </TabPane>
      <TabPane tab="Calender Mode" key="calenderMode">
        <CalenderMode />
      </TabPane>
    </Tabs>
  );
}

export default Home;