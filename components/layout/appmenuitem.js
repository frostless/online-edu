import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import User from "../../lib/user";
import { shouldSubMenuVisible, shouldMenItemVisible } from "./appmenuconfig";
import LoginTypes from "../types/logintypes"
const { SubMenu } = Menu;

function AppSubmenu(props) {
  const [visible, setVisible] = useState(false);
  const { owners, ...rest } = props;
  const key = props.eventKey;
  useEffect(() => {
    const loginType = User.getLoginType();
    let dynamicVisible = false;
    if (loginType === LoginTypes.manager) {
      const permittedMenus = User.getPermittedMenus();
      dynamicVisible = shouldSubMenuVisible(key, permittedMenus);
    }
    const predefinedVisible = owners && owners.includes(loginType);
    setVisible(dynamicVisible || predefinedVisible);
  }, []);
  return <React.Fragment>{visible && <SubMenu {...rest} />}</React.Fragment>;
}

export { AppSubmenu };

function AppMenuItem(props) {
  const [visible, setVisible] = useState(false);
  const { owners,  ...rest } = props;
  const key = props.eventKey;
  useEffect(() => {
    const loginType = User.getLoginType();
    let dynamicVisible = false;
    if (loginType === LoginTypes.manager) {
      const permittedMenus = User.getPermittedMenus();
      dynamicVisible = shouldMenItemVisible(key, permittedMenus);
    }
    const predefinedVisible = owners && owners.includes(loginType);
    setVisible(dynamicVisible || predefinedVisible);
  }, []);
  return <React.Fragment>{visible && <Menu.Item {...rest} />}</React.Fragment>;
}

export { AppMenuItem };