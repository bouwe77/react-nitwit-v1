// ===================================================
// Deze TimelineContainer gebruiken bij de ADVANCED
// als uitgangspunt.
// De opdracht is dan om dit te vervangen door useInterval,
// net zoals de eindopdracht van de FOUNDATION...
// ===================================================

import React, { useState, useEffect } from "react";
import axios from "axios";

import settings from "../settings";
import Timeline from "./Timeline";
import Compose from "./Compose";

function TimelinePage() {
  const [timeline, setTimeline] = useState([]);

  function addPost(content) {
    // Remember the timeline before the new one is added.
    const prevTimeline = timeline;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic updates")
    let newPost = { user: settings.user, content };
    setTimeline([newPost, ...timeline]);

    newPost = { content };
    // Post the new ToDo to the API.
    axios.post(settings.postsUrl, newPost).catch(error => {
      // Posting to the API failed so "rollback" the state to the previous timeline.
      setTimeline(prevTimeline);
      console.log(error, error.request, error.response, error.config);
    });
  }

  useEffect(() => {
    function getTimeline() {
      axios
        .get(settings.timelineUrl)
        .then(res => {
          setTimeline(res.data);
        })
        .catch(error => {
          console.log(error, error.request, error.response, error.config);
        });
    }
    getTimeline();
  }, []);

  return (
    <>
      <Compose addPost={addPost} />
      <Timeline posts={timeline} />
    </>
  );
}

export default TimelinePage;
