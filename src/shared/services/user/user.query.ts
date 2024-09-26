import { UpdatePasswordType, UpdateUserType } from "../../constants/types/user.type";

export const getCurrentUser = (id: string) => {
  return {
    operationName: "GetUser",
    query: `
    query GetUser($id: String!) {
        getUser(id: $id) {
            address
            avatar
            email
            fullName
            id
            phoneNumber
            username
        }
    }
            `,
    variables: { id },
  };
};

export const updateUserInfo = (data: UpdateUserType) => {
  return {
    operationName: "UpdateInfo",
    query: `
    mutation UpdateInfo($id: String!, $address: String!, $phoneNumber: String!, $email: String!, $fullName: String!, $avatar: String!) {
    updateInfo(
        address: $address
        email: $email
        fullName: $fullName
        id: $id
        phoneNumber: $phoneNumber
        avatar: $avatar
    ) {
        address
        avatar
        email
        fullName
        id
        username
        phoneNumber
    }
}
            `,
    variables: data,
  };
};

export const updateUserPassword = (data: UpdatePasswordType) => {
  return {
    operationName: "UpdatePassword",
    query: `
    mutation UpdatePassword($id: String!, $currentPassword: String!, $newPassword: String!) {
      updatePassword(currentPassword: $currentPassword, id: $id, newPassword: $newPassword) {
        avatar
        email
        fullName
        id
        password
        refreshToken
        username
      }
    }

            `,
    variables: data,
  };
};
