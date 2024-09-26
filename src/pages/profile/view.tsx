import React, { useState } from "react";
import {
  BarChartOutlined,
  KeyOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Drawer, Layout, Menu } from "antd";
import ResetComponent from "./components/resetComponent";
import OrderComponent from "./components/orderComponent";
import ProfileComponent from "./components/profileComponent";
import "../../assets/css/profile.css";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "PROFILE",
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    key: "ORDERS",
    label: "Orders",
    icon: <BarChartOutlined />,
  },
  {
    key: "RESET",
    label: "Reset password",
    icon: <KeyOutlined />,
  },
];

const Profileview: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("PROFILE");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "PROFILE":
        return <ProfileComponent />;
      case "ORDERS":
        return <OrderComponent />;
      case "RESET":
        return <ResetComponent />;
      default:
        return <ProfileComponent />;
    }
  };

  return (
    <Layout
      style={{
        padding: "24px 0",
        background: "white",
        borderRadius: 5,
        marginTop: 20,
      }}>
      <Sider
        collapsible
        trigger={null}
        breakpoint="md"
        collapsedWidth="0"
        width={200}
        style={{ background: "white" }}
        className="sider-desktop">
        <Menu
          onClick={onClick}
          style={{ flex: 1, minWidth: 0 }}
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <div className="menu-button-mobile">
          <Button
            className="menu-button-mobile"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            style={{ marginBottom: 16 }}
          />
        </div>
        {renderContent()}
      </Content>
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={toggleDrawer}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
        className="sider-mobile">
        <Menu
          onClick={onClick}
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          items={items}
        />
      </Drawer>
    </Layout>
  );
};

export default Profileview;
