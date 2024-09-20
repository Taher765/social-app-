import React, { useState, useContext, useEffect } from "react";
import "./ForgotPassword.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import ForgotPasswordForm from "../../components/Forms/ForgotPasswordForm";
import HeaderWebSite from "../../components/HeaderWebSite/HeaderWebSite";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const { baseUrl, auth } = useContext(Context);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/forgot-password`, {
        email,
        newPassword,
        secret,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setOk(true);
        setSuccess(data.success);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth !== null) navigate("/");
  });

  return (
    <div className="register">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <HeaderWebSite title={"forgot password"} />
            <ForgotPasswordForm
              email={email}
              setEmail={setEmail}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              handleSubmit={handleSubmit}
              loading={loading}
              setLoading={setLoading}
              secret={secret}
              setSecret={setSecret}
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-7">
            <Modal
              title="Congrats"
              open={ok}
              onCancel={() => setOk(false)}
              footer={null}
            >
              <p>{success}</p>

              <NavLink className={"btn btn-primary btn-sm"} to={"/login"}>
                Login
              </NavLink>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
