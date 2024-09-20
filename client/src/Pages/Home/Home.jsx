import React, { useContext } from "react";
import { Context } from "../../context/ContextProvider";
const Home = () => {
  const { auth } = useContext(Context);
  return (
    <div>
      <div className="container">
        <pre style={{ background: "#333", color: "#FFF", fontSize: "9px" }}>
          {JSON.stringify(auth, null, 4)}
        </pre>
      </div>
    </div>
  );
};
export default Home;
