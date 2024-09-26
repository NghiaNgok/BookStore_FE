/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

export const PopUpConfirm = (content: string, onConfirm: () => Promise<void>) => {
  Modal.confirm({
    title: "Confirm",
    icon: <ExclamationCircleOutlined />,
    content: `${content}`,
    okText: "Confirm",
    cancelText: "Cancel",
    onOk: async () => {
      await onConfirm();
    }
  });

  return null;
};
