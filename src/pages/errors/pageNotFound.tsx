import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_PATH } from "../../shared/constants/path";

const PageNotFound: FC = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(CUSTOMER_PATH.HOME);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={handleOnClick} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default PageNotFound;
