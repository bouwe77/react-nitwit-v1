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
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    async function getTimelineAsync() {
      const result = await getTimeline(settings.username);
      setTimeline(result);
    }
    getTimelineAsync();
  }, []);

  function addPost(content) {
    // Remember the timeline before the new post is added.
    const prevTimeline = timeline;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic UI updates")
    setTimeline([{ user: settings.username, content }, ...timeline]);

    // Post the new post to the API.
    savePost(settings.username, { content }).catch(() => {
      // Posting to the API failed so "rollback" the state to the previous posts.
      setTimeline(prevTimeline);
    });
  }

  return (
    <>
      <Compose addPost={addPost} />
      <Posts posts={timeline} />
    </>
  );
}

export default TimelinePage;
