import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import People from "../../components/People/People";
import { Context } from "../../context/ContextProvider";
import { RollbackOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Following = () => {
  const [people, setPeople] = useState([]);
  const { baseUrl, auth, setAuth } = useContext(Context);
  const getUsersFollowing = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/user-following`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersFollowing();
  }, []);

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/user-unfollow`,
        { _id: user._id },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      let newAuth = JSON.parse(localStorage.getItem("auth"));
      newAuth.user = data;
      localStorage.setItem("auth", JSON.stringify(newAuth));
      setPeople(people.filter((p) => p._id !== user._id));
      setAuth({ ...auth, user: data });
      toast.error("un follow" + user.username);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="row mt-5">
        {people.length > 0 &&
          people.map((user) => (
            <People
              user={user}
              key={user._id}
              handleFollow={() => handleFollow(user)}
            />
          ))}
      </div>
      <div className="text-center ">
        {" "}
        <Link to={"/dashboard"}>
          <RollbackOutlined
            className="text-center d-flex align-items-center justify-content-center mt-5 mx-auto"
            style={{
              backgroundColor: "#babbbb",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Following;
