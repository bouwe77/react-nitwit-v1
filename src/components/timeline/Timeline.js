import React, { useState, useEffect } from "react";

import Posts from "../posts/Posts";
import Compose from "../compose/Compose";
import { getTimeline } from "../../api/getTimeline";
import { savePost } from "../../api/savePost";

function Timeline({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getTimelineAsync() {
      const result = await getTimeline(username);
      setPosts(result);
    }
    getTimelineAsync();
  }, [username]);

  function addPost(content) {
    // Remember the posts before the new post is added.
    const prevPosts = posts;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic UI updates")
    setPosts([{ user: username, content }, ...posts]);

    // Post the new post to the API.
    savePost(username, { content }).catch(() => {
      // Posting to the API failed so "rollback" the state to the previous posts.
      setPosts(prevPosts);
    });
  }

  return (
    <>
      <Compose addPost={addPost} />
      <Posts posts={posts} />
    </>
  );
}

export default Timeline;
