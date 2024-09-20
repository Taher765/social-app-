import React from "react";
import { useState } from "react";

const CommentForm = ({ setComment, comment, addComment }) => {
  const [loading, setLoadin] = useState(false);
  return (
    <form>
      <div className="form-group d-flex align-items-center gap-2">
        <input
          onChange={(e) => setComment(e.target.value)}
          className="form-control"
          type="text"
          value={comment}
        />
        <button
          disabled={!comment}
          className="btn btn-sm btn-primary"
          onClick={addComment}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
