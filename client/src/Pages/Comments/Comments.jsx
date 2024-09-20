import React from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Comments</div>;
};

export default Comments;
