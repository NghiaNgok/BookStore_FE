import React, { FC } from "react";
import { Layout } from "antd";
import HeaderLayout from "./Header";
import FooterLayout from "./Footer";

interface MainProps {
  children: React.ReactNode;
}
const { Header, Content, Footer } = Layout;

const contentStyle: React.CSSProperties = {
  padding: "0 15%",
  marginTop: 64,
};

const Main: FC<MainProps> = ({ children }) => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <HeaderLayout />
        </Header>
        <Content style={contentStyle}>
          <div style={{ minHeight: 380 }}>{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            marginTop: 10,
            color: "#fff",
            height: 64,
            width: "100%",
          }}>
          <FooterLayout />
        </Footer>
      </Layout>
    </>
  );
};

export default Main;
