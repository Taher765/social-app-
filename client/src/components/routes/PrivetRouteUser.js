import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";

const PrivetRouteUser = ({ children, path }) => {
  const navigate = useNavigate();
  const { auth } = useContext(Context);

  const pushLoginAndRegister = () => {
    if (auth === null) {
      navigate(path);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    pushLoginAndRegister();
  }, [auth && auth.user]);

  return children;
};

export default PrivetRouteUser;
