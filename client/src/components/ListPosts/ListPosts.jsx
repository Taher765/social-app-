import React from "react";
import { Avatar } from "antd";
import Moment from "react-moment";
import htmr from "htmr";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const ListPosts = ({
  post,
  showDeleteConfirm,
  handleLike,
  handleUnlike,
  handleComment,
}) => {
  const { auth } = useContext(Context);
  console.log(post);
  return (
    <div className="col-md-12 mt-3">
      {" "}
      <div className="card">
        <div className="card-header p-1">
          {post.postedBy && post.postedBy.image && post.postedBy.image.url ? (
            <Avatar
              size={30}
              src={
                post.postedBy && post.postedBy.image && post.postedBy.image.url
              }
            />
          ) : (
            <Avatar size={30}>
              {post && post.postedBy?.name[0].toUpperCase()}
            </Avatar>
          )}

          <span className="mx-2 text-capitalize">
            {post && post.postedBy?.name}
          </span>
        </div>
        <div className="card-body p-1">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: "bold",
                  marginRight: "5px",
                }}
              >
                created at:
              </span>
              <Moment
                fromNow
                style={{
                  fontSize: "9px",
                  fontWeight: "100",
                }}
              >
                {post && post.createdAt}
              </Moment>
            </div>
          </div>
          {post && post.content.length > 0 && htmr(post && post.content)}
        </div>
        <div className="card-footer p-1">
          <div>
            {post && post.image && (
              <img
                style={{
                  maxHeight: "180px",
                  borderBottom: "1px solid #ccc",
                }}
                className="w-100 pb-1"
                src={post && post.image && post.image.url}
                alt=""
              />
            )}
          </div>
          <div
            className="d-flex align-items-center justify-content-between p-1"
            style={{
              fontSize: "9px",
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <div className="likes d-flex align-items-center gap-1">
                {post.likes.includes(auth.user._id) ? (
                  <HeartFilled
                    className="text-danger"
                    onClick={() => handleUnlike(post._id)}
                  />
                ) : (
                  <HeartOutlined
                    className="text-danger"
                    onClick={() => handleLike(post._id)}
                  />
                )}
                <span
                  style={{
                    cursor: "pointer",
                  }}
                >
                  ( {post.likes.length} ) love
                </span>
              </div>
              <div
                style={{
                  cursor: "pointer",
                }}
                className="comment d-flex align-items-center gap-1"
              >
                <CommentOutlined
                  className="text-primary"
                  onClick={() => handleComment(post)}
                />
                <Link to={`comments/${post._id}`}>
                  <span>( {post.comments.length} ) Comments</span>
                </Link>
              </div>
            </div>
            {auth.user._id === post.postedBy._id && (
              <div className="d-flex align-items-center gap-2">
                <Link
                  className="btn btn-sm text-warning"
                  to={`editpost/${post._id}`}
                >
                  <EditOutlined />
                </Link>
                <button
                  className="btn btn-sm text-danger"
                  onClick={() => showDeleteConfirm(post)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className="comments "
          style={{
            borderTop: "1px solid #ccc",
            maxHeight: "120px",
            overflowY: "auto",
          }}
        >
          {post.comments.slice(0, 4).map((c) => (
            <div
              key={c._id}
              className="p-1"
              style={{
                borderBottom: "1px solid #ccc",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="name">
                  {c.postedBy && c.postedBy.image ? (
                    <Avatar
                      size={15}
                      src={
                        c.postedBy && c.postedBy.image && c.postedBy.image.url
                      }
                    />
                  ) : (
                    <Avatar size={15}>
                      {c && c.postedBy?.name[0].toUpperCase()}
                    </Avatar>
                  )}

                  <span
                    style={{
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {c.postedBy.name}
                  </span>
                </div>
                <Moment
                  fromNow
                  style={{
                    fontSize: "9px",
                    fontWeight: "100",
                  }}
                >
                  {c?.created}
                </Moment>
              </div>
              <span
                className="ps-4 d-block bg-light"
                style={{ fontSize: "12px" }}
              >
                {c.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPosts;
