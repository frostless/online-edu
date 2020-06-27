import React, { useState } from "react";
import API from '../../lib/api'
import { Layout } from "antd";
import styled, {css} from 'styled-components';
import { LogoutOutlined } from "@ant-design/icons";
import AppMenu from "./appmenu";
import AppBreadcrumb from "./appbreadcrumb";

// Properties
const { Header, Content, Footer, Sider } = Layout;
// End Properties

// Style Components
const sharedBackGroundColor = css`
  background: #fff;
`;

const StyledLogoDiv= styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`
const StyledlayoutHeader = styled(Header)`
  &&& {
    ${sharedBackGroundColor}
  }
`;

const StyledLayoutDiv= styled.div`
  ${sharedBackGroundColor}
`
// End Style Components

function AppLayout(props) {
  const [collapsed, ToggleCollapse] = useState(false);

  const onCollapse = (collapsed) => {
    ToggleCollapse(collapsed);
  };

  const onLogout = () => {
    API.logout();
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <StyledLogoDiv />
      <AppMenu />
      </Sider>
      <Layout>
        <StyledlayoutHeader style={{ padding: 0 }}>
          <div style={{ textAlign: "right", marginRight: '16px' }}>
            <a onClick={onLogout}><LogoutOutlined style={{fontSize: '20px'}}/></a>
          </div>
        </StyledlayoutHeader>
        <Content style={{ margin: "0 16px" }}>
          <AppBreadcrumb />
          <StyledLayoutDiv style={{ padding: 24, minHeight: 360 }}>
            {props.content}
          </StyledLayoutDiv>
        </Content>
        <Footer style={{ textAlign: "center" }}>Curriculum Assistant</Footer>
      </Layout>
    </Layout>
  );
}

export default AppLayout;