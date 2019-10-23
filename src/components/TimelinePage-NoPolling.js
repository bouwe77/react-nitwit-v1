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
import { get as getFromApi } from "../api/get";
import { post as postToApi } from "../api/post";

function TimelinePage() {
  const [timeline, setTimeline] = useState([]);

  function addPost(content) {
    // Remember the timeline before the new post is added.
    const prevTimeline = timeline;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic UI updates")
    setTimeline([{ user: settings.user, content }, ...timeline]);

    // Post the new post to the API.
    postToApi(settings.postsUrl, { content }).catch(() => {
      // Posting to the API failed so "rollback" the state to the previous posts.
      setTimeline(prevTimeline);
    });
  }

  useEffect(() => {
    async function getTimeline() {
      const result = await getFromApi(settings.timelineUrl);
      setTimeline(result);
    }
    getTimeline();
  }, []);

  return (
    <>
      <Compose addPost={addPost} />
      <Posts posts={timeline} />
    </>
  );
}

export default TimelinePage;
