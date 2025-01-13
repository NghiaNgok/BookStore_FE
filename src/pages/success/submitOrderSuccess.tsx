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
      title="HOÀN TẤT ĐẶT HÀNG"
      subTitle="Đơn hàng của bạn đã được khởi tạo. Cảm ơn bạn rất nhiều !"
      extra={[
        <Button onClick={onClickGoHome} type="primary" key="console">
          Về trang chủ
        </Button>,
        <Button onClick={onClickGoShopping} key="buy">
          Tiếp tục mua hàng
        </Button>,
      ]}
    />
  );
};

export default OrderSuccessPage;
