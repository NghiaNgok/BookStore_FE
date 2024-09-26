/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
interface ImageUploadProps {
  setData: (value: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const { setData } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const cloundinaryName: string = import.meta.env.VITE_CLOUDIARY_CLOUD_NAME;

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // You can replace with your own upload preset if configured

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloundinaryName}/image/upload`,
        formData
      );

      onSuccess("Ok");
      message.success(`${file.name} file uploaded successfully.`);
      setData(response.data.url as string);
    } catch (err) {
      onError({ err });
      message.error(`${file.name} file upload failed.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload customRequest={uploadImage} showUploadList={false}>
      <Button icon={<UploadOutlined />} loading={loading}>
        Upload Image
      </Button>
    </Upload>
  );
};

export default ImageUpload;
