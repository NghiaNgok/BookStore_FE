import { FormProps, message } from "antd";
import { useNavigate } from "react-router-dom";

import SignUpView from "./view";
import { SignUpFieldType } from "../../../shared/constants/types/auth.type";
import { signUp } from "../../../shared/services/auth/auth.service";
import {
  successPopUpMessage,
  errorPopUpMessage,
} from "../../../shared/components/Notification";
import { AUTH_PATH } from "../../../shared/constants/path";

const SignUpPage = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<SignUpFieldType>["onFinish"] = async (values) => {
    try {
      const response = await signUp({
        ...values,
        avatar:
          "https://res.cloudinary.com/dyo7rdbmx/image/upload/v1716861871/c3rzctkh5otpkgua522n.jpg",
      });
      const checkResult = response.data;
      if (!checkResult.data) {
        const errorAlert = checkResult.errors[0];
        errorPopUpMessage("Sign up Failed", errorAlert.message);
      } else {
        successPopUpMessage("Sign Up Success");
        navigate(AUTH_PATH.SIGNIN);
      }
    } catch (error) {
      message.error("Signup failed. Please try again.");
    }
  };
  const onFinishFailed: FormProps<SignUpFieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return <SignUpView onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default SignUpPage;
