import React from "react";
import "./HeaderWebSite.css";
const HeaderWebSite = ({ title }) => {
  return (
    <div className="title py-2 mt-4 text-center bg-info">
      <h2 className="text-white text-capitalize">{title}</h2>
    </div>
  );
};

export default HeaderWebSite;
