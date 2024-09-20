import React from "react";
import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
  secret,
  setSecret,
  page,
  about,
  setAbout,
}) => {
  return (
    <form onSubmit={handleSubmit} className="p-2 bg-light rounded">
      {page !== "login" && (
        <>
          <div className="form-group mb-2">
            <label htmlFor="name">Name: </label>
            <input
              value={name}
              id="name"
              type={"text"}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter Your Name"
            />
          </div>
        </>
      )}

      <div className="form-group mb-2">
        <label htmlFor="email">Email: </label>
        <input
          value={email}
          id="email"
          type={"text"}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Enter Your Email"
          disabled={page === "update" && true}
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="password">Password: </label>
        <input
          value={password}
          id="password"
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter Your Password"
        />
      </div>

      {page == "update" && (
        <>
          <div className="form-group mb-2">
            <label htmlFor="username">Username: </label>
            <input
              value={username}
              id="username"
              type={"text"}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Enter Your Username"
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="about">About: </label>
            <input
              value={about}
              id="about"
              type={"text"}
              onChange={(e) => setAbout(e.target.value)}
              className="form-control"
              placeholder="Tell us Somthing About You"
            />
          </div>
        </>
      )}

      {page !== "login" && (
        <>
          <div className="form-group mb-2">
            <label htmlFor="secret">Secret: </label>
            <select id="secret" className="form-control text-capitalize">
              <option hidden value="Choose A Question">
                Choose a question
              </option>
              <option value="What Is The Type Of Your Cars">
                What is the type of your cars
              </option>
              <option value="What's your father's name">
                What's your father's name
              </option>
              <option value="What is your favorite Color">
                What is your favorite Color
              </option>
            </select>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="answer">Answer: </label>
            <input
              value={secret}
              id="answer"
              type={"text"}
              onChange={(e) => setSecret(e.target.value)}
              className="form-control"
              placeholder="Answer The Question"
            />
          </div>
        </>
      )}
      <div>
        <button disabled={loading} className="btn btn-primary form-control">
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
