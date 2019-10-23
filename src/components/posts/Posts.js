import React from "react";

import Post from "./Post";

function Posts({ posts }) {
  return (
    <>
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </>
  );
}

export default Posts;
