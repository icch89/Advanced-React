import Link from "next/link";
import { Menu, Button } from "antd";

const Nav = () => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={["2"]}
    style={{ lineHeight: "64px" }}
  />
);

export default Nav;
