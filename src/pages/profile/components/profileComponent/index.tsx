/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ProfileComponentView from "./view";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../../shared/redux-flow/selector";
import {
  ProfileUserType,
  UpdateUserType,
} from "../../../../shared/constants/types/user.type";
import {
  getUserApi,
  updateUserApi,
} from "../../../../shared/services/user/user.service";
import {
  errorPopUpMessage,
  successPopUpMessage,
} from "../../../../shared/components/Notification";
import { handleLogin } from "../../../../shared/redux-flow/action";
const ProfileComponent = () => {
  const userStore = useSelector(userSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState<ProfileUserType>();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userStore) {
      getCurrentUser(userStore.id);
    }
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getCurrentUser = async (id: string) => {
    try {
      const result = await getUserApi(id);
      if (!result.data.data) {
        errorPopUpMessage("failed to get user", result.data.errors[0].message);
        return;
      }
      setData(result.data.data.getUser);
    } catch (error) {
      errorPopUpMessage("Remove Cart failed", "");
      console.log("Error removing", error);
    }
  };

  const updateUserInfo = async (data: UpdateUserType) => {
    try {
      if(!userStore){
        errorPopUpMessage("Cannot find user", "");
        return;
      }
      setLoading(true);
      await delay(1000);
      const result = await updateUserApi({
        ...data,
        avatar: avatarUrl ? avatarUrl : (userStore?.avatar as string),
        id: userStore?.id as string,
      });
      if (!result.data.data) {
        errorPopUpMessage(
          "failed to update user",
          result.data.errors[0].message
        );
        setLoading(false);
        return;
      }
      const resultData = result.data.data.updateInfo;
      dispatch(handleLogin({...userStore, avatar: resultData.avatar }));
      setLoading(false);
      successPopUpMessage("Update success");
    } catch (error) {
      console.log("Error updating", error);
    }
  };

  const onFinishUpdateUser = (values: any) => {
    updateUserInfo(values);
  };

  return (
    <ProfileComponentView
      userData={data}
      onFinishUpdateUser={onFinishUpdateUser}
      avatarUrl={avatarUrl}
      setAvatarUrl={setAvatarUrl}
      loading={loading}
    />
  );
};

export default ProfileComponent;
