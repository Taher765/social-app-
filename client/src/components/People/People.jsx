import React from "react";
import image from "../../images/no-avatar.gif";
import { Avatar } from "antd";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";

const People = ({ user, handleFollow }) => {
  const { auth } = useContext(Context);
  return (
    <div className="col-12 mb-2" key={user._id}>
      <div
        style={{
          borderBottom: "1px solid #f6f6f6",
        }}
        className="d-flex justify-content-between align-items-center pb-1"
      >
        <div className="d-flex align-items-center gap-2 ">
          <Avatar
            className="border p-1"
            size={35}
            src={user.image?.url || image}
          />
          <p className="mb-0 mt-2">{user.username && user.username}</p>
        </div>
        <span
          className="text-primary"
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleFollow(user)}
        >
          {auth && auth.user && auth.user.following.includes(user._id)
            ? "Un Follow"
            : "Follow"}
        </span>
      </div>
    </div>
  );
};

export default People;
