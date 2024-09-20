import React, { useState, useContext } from "react";
import "./Register.css";
import AuthForm from "../../components/Forms/AuthForm";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import HeaderWebSite from "../../components/HeaderWebSite/HeaderWebSite";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/register`, {
        name,
        email,
        password,
        secret,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        setSecret("");
        setOk(data.ok);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <HeaderWebSite title={"register"} />
            <AuthForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              loading={loading}
              setLoading={setLoading}
              secret={secret}
              setSecret={setSecret}
              page="register"
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
              <p>You Hove Successfuly Registered</p>

              <NavLink className={"btn btn-primary btn-sm"} to={"/login"}>
                Login
              </NavLink>
            </Modal>
          </div>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <p>Already Registered</p>
            <NavLink className={"nav-link text-primary"} to={"/login"}>
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
