// ===================================================
// Deze TimelineContainer gebruiken bij de ADVANCED
// als uitgangspunt.
// De opdracht is dan om dit te vervangen door useInterval,
// net zoals de eindopdracht van de FOUNDATION...
// ===================================================

import React, { useState, useEffect } from "react";

import settings from "../settings";
import Posts from "./posts/Posts";
import Compose from "./compose/Compose";
import { getTimeline } from "../api/getTimeline";
import { savePost } from "../api/savePost";

function TimelinePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getTimelineAsync() {
      const result = await getTimeline(settings.username);
      setPosts(result);
    }
    getTimelineAsync();
  }, []);

  function addPost(content) {
    // Remember the posts before the new post is added.
    const prevPosts = posts;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic UI updates")
    setPosts([{ user: settings.username, content }, ...posts]);

    // Post the new post to the API.
    savePost(settings.username, { content }).catch(() => {
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

export default TimelinePage;
