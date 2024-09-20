import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import AuthForm from "../../components/Forms/AuthForm";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderWebSite from "../../components/HeaderWebSite/HeaderWebSite";
const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Var
  const { baseUrl, auth, setAuth } = useContext(Context);
  const navigate = useNavigate();
  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth({
          user: data.user,
          token: data.token,
        });
        window.localStorage.setItem("auth", JSON.stringify(data));

        setLoading(false);
        toast.success("Done");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (auth !== null) navigate("/");
  // });

  return (
    <div className="register">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <HeaderWebSite title={"login"} />
            <AuthForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              page="login"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-2">
          <p>Already Registered</p>
          <NavLink className={"nav-link text-primary"} to={"/register"}>
            Register
          </NavLink>
        </div>
        <div className="d-flex justify-content-center gap-2 ">
          <NavLink className={"text-danger nav-link"} to={"/forgot-password"}>
            Forget Password
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
