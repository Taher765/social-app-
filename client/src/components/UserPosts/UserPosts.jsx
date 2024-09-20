import ListPosts from "../ListPosts/ListPosts";

const UserPosts = ({
  posts,
  showDeleteConfirm,
  handleComment,
  handleLike,
  handleUnlike,
}) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <ListPosts
            post={post}
            key={post._id}
            showDeleteConfirm={showDeleteConfirm}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
          />
        ))}
    </>
  );
};

export default UserPosts;
