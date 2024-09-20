import axios from "axios";
import React, { useEffect, useContext, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreatePostForm from "../../components/Forms/CreatePostForm";
import { Context } from "../../context/ContextProvider";
const EditPost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);
  const { id } = useParams();
  const { baseUrl, auth } = useContext(Context);
  const navigate = useNavigate();
  const getPost = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/user-posts/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setContent(data.content);
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${baseUrl}/update-post/${id}`,
        {
          image,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success("Update Post");
      navigate("/dashboard");
    } catch (error) {
      // Error Middelware
      toast.error(error.response.data);
    }
  };
  return (
    <div className="container">
      <CreatePostForm
        content={content}
        setContent={setContent}
        image={image}
        setImage={setImage}
        loadingImage={loadingImage}
        setLoadingImage={setLoadingImage}
        postSubmit={postSubmit}
      />
    </div>
  );
};

export default EditPost;
