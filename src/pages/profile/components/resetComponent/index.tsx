/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import ResetComponentView from "./view";
import { UpdatePasswordType } from "../../../../shared/constants/types/user.type";
import { updatePasswordApi } from "../../../../shared/services/user/user.service";
import {
  errorPopUpMessage,
  successPopUpMessage,
} from "../../../../shared/components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../../shared/redux-flow/selector";
import { handleLogout } from "../../../../shared/redux-flow/action";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH } from "../../../../shared/constants/path";

const ResetComponent: FC = () => {
  const userStore = useSelector(userSelector); 
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleUpdatePassword = async (data: UpdatePasswordType) => {
    try {
      setLoading(true);
      await delay(1000);
      const result = await updatePasswordApi(data);
      if (!result.data.data) {
        errorPopUpMessage(
          "Error updating password",
          result.data.errors[0].message
        );
        setLoading(false);
        return;
      }
      successPopUpMessage("Updated password successfull");
      dispatch(handleLogout());
      setLoading(false);
      navigate(AUTH_PATH.SIGNIN);
    } catch (error) {
      console.error(error);
    }
  };
  const updatePassword = (value: any) => {
    handleUpdatePassword({ ...value, id: userStore?.id });
  };
  return <ResetComponentView updatePassword={updatePassword} loading={loading} />;
};

export default ResetComponent;
