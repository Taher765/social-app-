import { Avatar } from "antd";
import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import "./Navigation.css";
const Navigation = () => {
  const { auth, setAuth } = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("auth");
    setAuth(null);
    navigate("/login");
  };

  return (
    <div className="bg-light py-2">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link className={"navbar-brand text-uppercase"} to={"/"}>
              social club
            </Link>
          </div>
          {auth && auth.token ? (
            <div className="btn-group">
              {auth && auth.user && auth.user.image ? (
                <Link className={"dropdown-item"} to="/dashboard">
                  <Avatar size={30} src={auth.user.image.url} />
                </Link>
              ) : (
                <Link className={"dropdown-item"} to="/dashboard">
                  <Avatar size={30}>
                    {auth && auth.user && auth.user.name[0].toUpperCase()}
                  </Avatar>
                </Link>
              )}
              <button
                type="button"
                className="btn btn-sm dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to={"/dashpoard/profile"} className="dropdown-item ">
                    Hi {auth && auth.user && auth.user.name}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashpoard/update-profile"}
                    className="dropdown-item "
                  >
                    Update Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="dropdown-item text-danger"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <NavLink className={" nav-link"} to={"/register"}>
                Register
              </NavLink>
              <NavLink className={"nav-link"} to={"/login"}>
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
