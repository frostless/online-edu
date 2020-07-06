import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Login from "../../lib/login";
const { SubMenu } = Menu;

function AppSubmenu(props) {
  const [visible, setVisible] = useState(false);
  const { owners, ...rest } = props;
  useEffect(() => {
    const loginType = Login.getLoginType();
    const visible = owners.includes(loginType);
    setVisible(visible);
  }, []);
  return <React.Fragment>{visible && <SubMenu {...rest} />}</React.Fragment>;
}

export { AppSubmenu };

function AppMenuItem(props) {
  const [visible, setVisible] = useState(false);
  const { owners, ...rest } = props;
  useEffect(() => {
    const loginType = Login.getLoginType();
    const visible = owners.includes(loginType);
    setVisible(visible);
  }, []);
  return <React.Fragment>{visible && <Menu.Item {...rest} />}</React.Fragment>;
}

export { AppMenuItem };