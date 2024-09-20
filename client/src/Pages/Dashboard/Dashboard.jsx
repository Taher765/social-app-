import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CreatePostForm from "../../components/Forms/CreatePostForm";
import { Context } from "../../context/ContextProvider";
import { toast } from "react-toastify";
import UserPosts from "../../components/UserPosts/UserPosts";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import DashboardSideBar from "../../components/DashboardSideBar/DashboardSideBar";
import CommentForm from "../../components/Forms/CommentForm";
const { confirm } = Modal;

const Dashboard = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [posts, setPost] = useState([]);
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState(null);

  const { auth, baseUrl } = useContext(Context);

  // Add post
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/create-post`,
        { content, image },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        getNewsFeed();
        toast.success("Post Created");
        setImage({});
        setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get News Feed
  const getNewsFeed = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/news-feed`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNewsFeed();
  }, []);

  // Handle Delete Post
  const showDeleteConfirm = (postid) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setPost(posts.filter((post) => post._id !== postid._id));
          const { data } = await axios.delete(
            `${baseUrl}/delete-post/${postid._id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          toast.error("Post Deleted");
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {
        return;
      },
    });
  };

  // Handle Like
  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/like-post`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      getNewsFeed();
    } catch (err) {
      console.log(err);
    }
  };
  // Handle Unlike
  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/unlike-post`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      getNewsFeed();
    } catch (err) {
      console.log(err);
    }
  };
  // Handle Comment
  const handleComment = (post) => {
    setPostId(post._id);
    setVisible(true);
  };
  // add Comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${baseUrl}/add-comment`,
        {
          postId,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setVisible(false);
      getNewsFeed();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dashboard mt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 mb-2">
            <CreatePostForm
              postSubmit={postSubmit}
              content={content}
              setContent={setContent}
              setImage={setImage}
              image={image}
            />
            <div className="row mt-5">
              <UserPosts
                handleLike={handleLike}
                handleUnlike={handleUnlike}
                posts={posts}
                showDeleteConfirm={showDeleteConfirm}
                handleComment={handleComment}
              />
            </div>
          </div>
          <div className="col-md-6">
            <DashboardSideBar getNewsFeed={getNewsFeed} />
          </div>
        </div>
        <Modal
          title="Add Comment"
          open={visible}
          footer={null}
          onCancel={() => setVisible(false)}
        >
          <CommentForm
            setComment={setComment}
            comment={comment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
