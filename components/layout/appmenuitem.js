import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Login from "../../lib/login";
const { SubMenu } = Menu;

function AppSubmenu(props) {
  const [isTeacher, setIsTeacher] = useState(false);
  const { visible, ...rest } = props;
  useEffect(() => {
    const isTeacher = Login.getLoginType() === "teacher";
    setIsTeacher(isTeacher);
  }, []);
  return (
    <React.Fragment>
        {(isTeacher || visible) && (
            <SubMenu {...rest} />
         )
        }
    </React.Fragment>
  );
}

export { AppSubmenu };

function AppMenuItem(props) {
    const [isTeacher, setIsTeacher] = useState(false);
    const { visible, ...rest } = props;
    useEffect(() => {
      const isTeacher = Login.getLoginType() === "teacher";
      setIsTeacher(isTeacher);
    }, []);
    return (
      <React.Fragment>
          {(isTeacher || visible) && (
              <Menu.Item {...rest} />
           )
          }
      </React.Fragment>
    );
  }
  
  export { AppMenuItem };