import React from "react";
import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
  email,
  setEmail,
  newPassword,
  setNewPassword,
  handleSubmit,
  loading,
  secret,
  setSecret,
}) => {
  return (
    <form onSubmit={handleSubmit} className="p-2 bg-light rounded">
      <div className="form-group mb-2">
        <label htmlFor="email">Email: </label>
        <input
          value={email}
          id="email"
          type={"text"}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Enter New Email"
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="password">New Password: </label>
        <input
          value={newPassword}
          id="password"
          type={"text"}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control"
          placeholder="Enter New Password"
        />
      </div>

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
      <div>
        <button disabled={loading} className="btn btn-primary form-control">
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
