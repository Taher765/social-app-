import axios from "axios";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/ContextProvider";
import People from "../People/People";
const DashboardSideBar = ({ getNewsFeed }) => {
  const [people, setPeople] = useState([]);

  const { baseUrl, auth, setAuth } = useContext(Context);

  // Get People
  const getAllPeople = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/find-people`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/user-follow`,
        { _id: user._id },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      setPeople(people.filter((p) => p._id !== user._id));
      toast.success("Following " + user.name);

      let newAuth = JSON.parse(localStorage.getItem("auth"));
      newAuth.user = data;
      localStorage.setItem("auth", JSON.stringify(newAuth));
      setAuth({ ...auth, user: data });
      getNewsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"side-bar"}>
      <div className="my-3">
        {auth && auth.user && auth.user.following && (
          <Link to={"/dashboard/following"} style={{ textDecoration: "none" }}>
            {auth.user.following.length} <span>Following</span>
          </Link>
        )}
      </div>
      <div className="row">
        {people.length > 0 &&
          people.map((user) => (
            <People
              user={user}
              key={user._id}
              handleFollow={() => handleFollow(user)}
            />
          ))}
      </div>
    </div>
  );
};

export default DashboardSideBar;
