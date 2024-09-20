import HandleUploadImage from "../HandleUploadImage/HandleUploadImage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePostForm = ({
  content,
  setContent,
  postSubmit,
  image,
  setImage,
}) => {
  return (
    <div className="card">
      <form onSubmit={postSubmit}>
        <div className="card-body p-1">
          <ReactQuill
            onChange={(e) => setContent(e)}
            theme={"snow"}
            value={content}
            className="form-control"
            placeholder="write something..."
            style={{
              resize: "none",
            }}
          />
        </div>
        <div className="card-footer p-1 d-flex justify-content-between align-items-center">
          <button className="btn btn-primary btn-sm">Post</button>
          <HandleUploadImage image={image} setImage={setImage} />
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
