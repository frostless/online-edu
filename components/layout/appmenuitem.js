import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Login from "../../lib/login";
const { SubMenu } = Menu;

function AppSubmenu(props) {
  const [isTeacher, setIsTeacher] = useState(false);
  const { visibleForStudent } = props;
  useEffect(() => {
    const isTeacher = Login.getLoginType() === "teacher";
    setIsTeacher(isTeacher);
  }, []);
  return (
    <React.Fragment>
        {(isTeacher || visibleForStudent) && (
            <SubMenu {...props} />
         )
        }
    </React.Fragment>
  );
}

export { AppSubmenu };

function AppMenuItem(props) {
    const [isTeacher, setIsTeacher] = useState(false);
    const { visibleForStudent } = props;
    useEffect(() => {
      const isTeacher = Login.getLoginType() === "teacher";
      setIsTeacher(isTeacher);
    }, []);
    return (
      <React.Fragment>
          {(isTeacher || visibleForStudent) && (
              <Menu.Item {...props} />
           )
          }
      </React.Fragment>
    );
  }
  
  export { AppMenuItem };