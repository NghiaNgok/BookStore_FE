import React, { useState } from "react";
import { CurrentStatus } from "../../view";
import {
  IOrderCreate,
} from "../../../../shared/constants/types/order.type";
import { Button, Form, FormProps, Typography, Select } from "antd";
import { successPopUpMessage } from "../../../../shared/components/Notification";
import { PaymentMethod } from "../../../../shared/constants/types/enum.type";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
  },
};

const { Text } = Typography;

interface paymentFormFormProps {
  setValue: (value: IOrderCreate) => void;
  value?: IOrderCreate;
  setCurrentStatus: (value: CurrentStatus) => void;
}

type FieldType = {
  paymentMethod: PaymentMethod;
};

const PaymentForm: React.FC<paymentFormFormProps> = (props) => {
  const { setValue, value, setCurrentStatus } = props;
  const [selectPayment, setSelectPayment] = useState<PaymentMethod>(
    PaymentMethod.COD
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (value) {
      setValue({
        ...value,
        paymentMethod: values.paymentMethod,
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
        paymentMethod: value?.paymentMethod
      }}
      style={{ width: "50%" }}>
      <Form.Item
        label="Phương thức thanh toán"
        name="paymentMethod"
        rules={[{ required: true, message: "Please select payment method!" }]}>
        <Select
          onChange={(value) => setSelectPayment(value)}
          options={[
            { value: PaymentMethod.COD, label: "Thanh toán khi nhận hàng" },
            { value: PaymentMethod.ONLINE_BANKING, label: "Chuyển khoản online" },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={
            selectPayment === PaymentMethod.ONLINE_BANKING ? true : false
          }
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
      {selectPayment !== PaymentMethod.COD ? (
        <Text italic type="danger">
          Xin lỗi! Tính năng này chưa sẵn sàng T.T
        </Text>
      ) : (
        ""
      )}
    </Form>
  );
};

export default PaymentForm;
