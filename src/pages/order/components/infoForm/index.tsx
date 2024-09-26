import { Button, Form, FormProps, Input } from "antd";
import React from "react";
import { IOrderCreate } from "../../../../shared/constants/types/order.type";
import { CurrentStatus } from "../../view";
import { successPopUpMessage } from "../../../../shared/components/Notification";
import { validatePhoneNumber } from "../../../../shared/validation/phone.validation";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
  },
};

interface infoFormProps {
  setValue: (value: IOrderCreate) => void;
  value?: IOrderCreate;
  setCurrentStatus: (value: CurrentStatus) => void;
}

type FieldType = {
  customerName: string;
  phoneNumber: string;
  address: string;
};

const InfoForm: React.FC<infoFormProps> = (props) => {
  const { setValue, value, setCurrentStatus } = props;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (value) {
      setValue({
        ...value,
        customerName: values.customerName,
        phoneNumber: values.phoneNumber,
        address: values.address,
      });
      setCurrentStatus(CurrentStatus.FINISH);
      successPopUpMessage("Save Success");
    }
  };

  return (
    <Form
      {...formItemLayout}
      layout="vertical"
      variant="filled"
      onFinish={onFinish}
      initialValues={{
        customerName: value?.customerName,
        phoneNumber: value?.phoneNumber,
        address: value?.address,
      }}
      style={{ width: "50%" }}>
      <Form.Item
        label="Customer Name"
        name="customerName"
        rules={[{ required: true, message: "Please input name!" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[
          { required: true, message: "Please input phone number!" },
          { validator: validatePhoneNumber },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input address!" }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InfoForm;
