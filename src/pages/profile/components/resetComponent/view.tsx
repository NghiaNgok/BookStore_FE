/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Spin } from "antd";
import { FC } from "react";
import { validateMinLength } from "../../../../shared/validation/password.validation";
interface ResetPasswordProps {
  updatePassword: (value: any) => void;
  loading: boolean;
}
const ResetComponentView: FC<ResetPasswordProps> = (props) => {
  const { updatePassword, loading } = props;
  return (
    <>
      <Spin spinning={loading} tip="Loading...">
        <Form name="info" layout="vertical" onFinish={updatePassword}>
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
              { validator: validateMinLength },
            ]}
            hasFeedback>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            dependencies={["currentPassword"]}
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              { validator: validateMinLength },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("currentPassword") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password must be different from the current password")
                  );
                },
              }),
            ]}
            hasFeedback>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu mới"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              { validator: validateMinLength },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default ResetComponentView;
