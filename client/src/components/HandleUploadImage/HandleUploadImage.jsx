import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import { Avatar } from "antd";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

const HandleUploadImage = ({ setImage, image, page }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  // Upload image To Cloudinary (SERVER)
  const { auth, baseUrl } = useContext(Context);
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setLoadingImage(true);
    try {
      const { data } = await axios.post(`${baseUrl}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setLoadingImage(false);
      setImage(data);
    } catch (error) {
      console.log(error);
      setLoadingImage(false);
    }
  };
  return (
    <label style={{ cursor: "pointer", lineHeight: "0px" }}>
      {image && image.url ? (
        <Avatar src={image.url} size={page === "update" ? 60 : 40} />
      ) : loadingImage ? (
        <LoadingOutlined />
      ) : (
        <CameraOutlined />
      )}
      <input type="file" hidden accept="image/*" onChange={uploadImage} />
    </label>
  );
};

export default HandleUploadImage;
