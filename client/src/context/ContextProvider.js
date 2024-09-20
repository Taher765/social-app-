import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(window.localStorage.getItem("auth"))
  );
  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    setAuth(JSON.parse(window.localStorage.getItem("auth")));
  }, [auth && auth.token]);
  // عشان يدخل علي اللوجين لما صلاحيه التوكين تخلص
  // const navigate = useNavigate();
  // axios.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   },
  //   function (error) {
  //     let res = error.response;
  //     if (res.status === 401 && res.config && !res.config._isRetryRequest) {
  //       setAuth(null);
  //       window.localStorage.removeItem("auth");
  //       navigate("/login");
  //     }
  //   }
  // );
  return (
    <Context.Provider value={{ baseUrl, setAuth, auth }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
