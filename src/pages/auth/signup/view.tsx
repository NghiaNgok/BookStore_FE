import React from "react";
import { Button, Flex, Form, Input } from "antd";
import type { FormProps } from "antd";
import { SignUpFieldType } from "../../../shared/constants/types/auth.type";
import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AUTH_PATH } from "../../../shared/constants/path";
import { validatePhoneNumber } from "../../../shared/validation/phone.validation";
import { validateEmail } from "../../../shared/validation/email.validation";
import { validateMinLength } from "../../../shared/validation/password.validation";
import '../../../assets/css/LoginForm.css'

interface SignViewProps {
  onFinish: FormProps<SignUpFieldType>["onFinish"];
  onFinishFailed: FormProps<SignUpFieldType>["onFinishFailed"];
}
const containerStyle: React.CSSProperties = {
  marginTop: 20,
  width: "100%",
  alignItems: "center",
};

const SignUpView: React.FC<SignViewProps> = (props) => {
  const { onFinishFailed, onFinish } = props;
  return (
    <Flex align="center" justify="center" vertical style={containerStyle}>
      <h1>SIGNUP FORM</h1>
      <hr />
      <Form
        name="normal_login"
        className="register-form"
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Please input your full name!" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Full Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { validator: validateEmail },
          ]}>
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { validator: validatePhoneNumber },
          ]}>
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone number"
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}>
          <Input
            prefix={<HomeOutlined className="site-form-item-icon" />}
            placeholder="Address"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { validator: validateMinLength },
          ]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" vertical gap={5}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Sign Up
            </Button>
            <span>
              Already have account ?{" "}
              <Link to={AUTH_PATH.SIGNIN}>signin now !</Link>
            </span>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};
export default SignUpView;
