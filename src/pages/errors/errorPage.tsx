import { Button, Result } from "antd";
import { CUSTOMER_PATH } from "../../shared/constants/path";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(CUSTOMER_PATH.HOME);
  };
  return (
    <Result
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button onClick={handleOnClick} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
