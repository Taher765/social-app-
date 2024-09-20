import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context/ContextProvider";
const PrivetRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();
  const { baseUrl, auth } = useContext(Context);

  useEffect(() => {
    getCurrentUser();
  }, [auth && auth.token]);

  const getCurrentUser = async () => {
    // try {
    //   const { data } = await axios.get(`${baseUrl}/current-user`, {
    //     headers: {
    //       Authorization: `Bearer ${auth.token}`,
    //     },
    //   });
    //   if (data.ok) setOk(true);
    // } catch (err) {
    //   setOk(false);
    //   setTimeout(() => {
    //     return navigate("/login");
    //   }, 1000);
    // }

    if (auth != null) {
      try {
        const { data } = await axios.get(`${baseUrl}/current-user`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (data.ok) setOk(true);
      } catch (err) {
        setOk(false);
        setTimeout(() => {
          return navigate("/login");
        }, 1000);
      }
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="display-1 d-flex text-primary mt-5 justify-content-center"
        />
      ) : (
        children
      )}
    </>
  );
};

export default PrivetRoute;
