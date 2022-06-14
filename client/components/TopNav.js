import React, { useState, useContext } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  CloudFilled,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { AuthContext } from "../context/auth";
import Router from "next/router";
import toast from "react-hot-toast";

const TopNav = () => {
  const [current, setCurrent] = useState("mail");
  const [auth, setAuth] = useContext(AuthContext);
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Successfully logged out");
    Router.push("/login");
  };

  return (
    <>
      <Menu
        onClick={handleClick}
        mode="horizontal"
        defaultSelectedKeys={[current]}
        theme="dark"
      >
        <Menu.Item key="mail" icon={<CloudFilled />}>
          <Link href={"/"}>
            <a>BLOGGER</a>
          </Link>
        </Menu.Item>
        {auth.user !== null ? (
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            style={{ marginLeft: "auto" }}
          >
            <Link href={"/login"}>
              <a onClick={logoutHandler}>Logout</a>
            </Link>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item
              key="register"
              icon={<UserAddOutlined />}
              style={{ marginLeft: "auto" }}
            >
              <Link href={"/register"}>
                <a>Register</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<UserOutlined />}>
              <Link href={"/login"}>
                <a>Login</a>
              </Link>
            </Menu.Item>
          </>
        )}
        {auth.user && (
          <Menu.SubMenu
            key="SubMenu"
            title={auth?.user?.name || "User"}
            icon={<SettingOutlined />}
          >
            {auth?.user && auth.user.role === "admin" && (
              <Menu.ItemGroup title="Management">
                <Menu.Item key="one" icon={<AppstoreOutlined />}>
                  <Link href={"/admin"}>
                    <a>Admin Dashboard</a>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            )}
            {auth.user && auth.user.role === "Subscriber" && (
              <Menu.ItemGroup title="Management">
                <Menu.Item key="one" icon={<AppstoreOutlined />}>
                  <Link href={"/user/profile"}>
                    <a>Profile</a>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            )}
            {auth.user && auth.user.role === "author" && (
              <Menu.ItemGroup title="Management">
                <Menu.Item key="one" icon={<AppstoreOutlined />}>
                  <Link href={"/author"}>
                    <a>Dashboard</a>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            )}
          </Menu.SubMenu>
        )}
      </Menu>
    </>
  );
};

export default TopNav;
