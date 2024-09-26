import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_PATH } from "../../shared/constants/path";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const onClickGoHome = () => {
    navigate(CUSTOMER_PATH.HOME);
  };
  const onClickGoShopping = () => {
    navigate(CUSTOMER_PATH.SHOP);
  };
  return (
    <Result
      status="success"
      title="Successfully Created Order"
      subTitle="Your Order has been created. Thank you very much !"
      extra={[
        <Button onClick={onClickGoHome} type="primary" key="console">
          Go Home
        </Button>,
        <Button onClick={onClickGoShopping} key="buy">
          Continue Shopping
        </Button>,
      ]}
    />
  );
};

export default OrderSuccessPage;
