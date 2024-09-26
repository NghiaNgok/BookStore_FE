import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  ConfigProvider,
  Drawer,
  Dropdown,
  Flex,
  Menu,
  MenuProps,
} from "antd";
import { AUTH_PATH, CUSTOMER_PATH } from "../../constants/path";
import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { cartSelector, userSelector } from "../../redux-flow/selector";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../redux-flow/action";
import { successPopUpMessage } from "../Notification";
import { logOut } from "../../services/auth/auth.service";
import "../../../assets/css/HeaderLayout.css";

const contentStyle: React.CSSProperties = {
  color: "white",
};

const HeaderLayout: React.FC = () => {
  const userStore = useSelector(userSelector);
  const cartStore = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogoutApi = async () => {
    if (userStore) {
      const result = await logOut({ uid: userStore.id });
      if (result.data.data) {
        dispatch(handleLogout());
        successPopUpMessage("Sign Out successfully");
        navigate(AUTH_PATH.SIGNIN);
      }
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const itemsWithOutLogin: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={AUTH_PATH.SIGNIN}>Sign In</Link>,
    },
    {
      key: "2",
      label: <Link to={AUTH_PATH.SIGNUP}>Sign Up</Link>,
    },
  ];
  const itemsWithLogin: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={CUSTOMER_PATH.PROFILE}>Profile</Link>,
    },
    {
      key: "2",
      label: "Sign Out",
      onClick: () => handleLogoutApi(),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          padding: 5,
        },
      }}>
      <Flex justify="space-between" align="center">
        <Flex gap="small">
          <img src={logo} alt="logo" height={60} />
        </Flex>

        <Flex
          gap="large"
          justify="space-between"
          align="center"
          className="header-pc">
          <Button style={contentStyle} type="link">
            <Link to={CUSTOMER_PATH.HOME}>Home</Link>
          </Button>
          <Button style={contentStyle} type="link">
            <Link to={CUSTOMER_PATH.SHOP}>Shop</Link>
          </Button>
          <Button style={contentStyle} type="link">
            <Link to={CUSTOMER_PATH.ABOUT}>About</Link>
          </Button>
          {userStore ? (
            <Button style={contentStyle} type="link">
              <Link to={userStore ? CUSTOMER_PATH.CART : AUTH_PATH.SIGNIN}>
                <Badge size="small" count={cartStore ? cartStore.length : 0}>
                  <ShoppingCartOutlined
                    style={{ fontSize: 20, color: "white" }}
                  />
                </Badge>
              </Link>
            </Button>
          ) : (
            ""
          )}

          <Dropdown
            menu={{ items: userStore ? itemsWithLogin : itemsWithOutLogin }}
            placement="bottom"
            arrow>
            <div style={{ color: "white" }}>
              {userStore ? (
                <Avatar style={{ marginTop: -7 }} src={userStore.avatar} />
              ) : (
                <Button
                  style={contentStyle}
                  icon={<UserOutlined />}
                  type="link"></Button>
              )}
            </div>
          </Dropdown>
        </Flex>

        <div className="header-mobile">
          <Button type="primary" icon={<UnorderedListOutlined color="white" style={{fontSize: 30}}/>} onClick={showDrawer} />

          <Drawer title="Menu" placement="right" onClose={onClose} open={open}>
            <Menu>
              <Menu.Item>
                <Link to={CUSTOMER_PATH.HOME} onClick={onClose}>
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={CUSTOMER_PATH.SHOP} onClick={onClose}>
                  Shop
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={CUSTOMER_PATH.ABOUT} onClick={onClose}>
                  About
                </Link>
              </Menu.Item>
            </Menu>
            <Menu items={userStore ? itemsWithLogin : itemsWithOutLogin} />
          </Drawer>
        </div>
      </Flex>
    </ConfigProvider>
  );
};

export default HeaderLayout;
