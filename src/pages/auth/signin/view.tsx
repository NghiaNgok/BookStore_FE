import React from "react";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import type { FormProps } from "antd";
import { LoginFieldType } from "../../../shared/constants/types/auth.type";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AUTH_PATH } from "../../../shared/constants/path";
import { validateMinLength } from "../../../shared/validation/password.validation";
import '../../../assets/css/LoginForm.css'

interface SignViewProps {
  onFinish: FormProps<LoginFieldType>["onFinish"];
  onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"];
}
const containerStyle: React.CSSProperties = {
  marginTop: 20,
  width: "100%",
  alignItems: "center",
};
// const formStyle: React.CSSProperties = {
//   padding: 10,
//   width: "30%",
// };

const SignInView: React.FC<SignViewProps> = (props) => {
  const { onFinishFailed, onFinish } = props;
  return (
    <Flex align="center" justify="center" vertical style={containerStyle}>
      <h1>SIGNIN FORM</h1>
      <hr />
      <Form
        // style={formStyle}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }, {validator: validateMinLength}]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" wrap gap={10}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" vertical gap={5}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Sign In
            </Button>
            <span>
              Or <Link to={AUTH_PATH.SIGNUP}>signup now !</Link>
            </span>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};
export default SignInView;
