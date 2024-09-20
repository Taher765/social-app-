import React, { useState, useContext, useEffect } from "react";
import "./UpdateProflie.css";
import HandleUploadImage from "../../components/HandleUploadImage/HandleUploadImage";
import AuthForm from "../../components/Forms/AuthForm";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import HeaderWebSite from "../../components/HeaderWebSite/HeaderWebSite";
const UpdateProflie = () => {
  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { baseUrl, auth, setAuth } = useContext(Context);
  useEffect(() => {
    if (auth && auth.user) {
      setImage(auth.user && auth.user.image && auth.user.image);
      setName(auth.user.name);
      setEmail(auth.user.email);
      setAbout(auth.user.about && auth.user.about);
      setUsername(auth.user.username);
    }
  }, [auth && auth.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/update-profile`,
        {
          image,
          username,
          about,
          name,
          password,
          email,
          secret,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        toast.info("Modified successfully");
        let newAuth = JSON.parse(localStorage.getItem("auth"));
        newAuth.user = data;
        localStorage.setItem("auth", JSON.stringify(newAuth));
        setAuth({ ...auth, user: data });
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
            <HeaderWebSite title={"Update Profile"} />
            <div className="d-flex align-items-center justify-content-center my-3">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#f6f6f6",
                }}
              >
                <HandleUploadImage
                  page="update"
                  image={image}
                  setImage={setImage}
                />
              </div>
            </div>
            <AuthForm
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              loading={loading}
              setLoading={setLoading}
              secret={secret}
              setSecret={setSecret}
              about={about}
              setAbout={setAbout}
              page="update"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProflie;
