import { useState } from "react";
import axios from "axios";
import settings from "../settings";
import useInterval from "@use-it/interval";
import { getIfNew } from "../api/getIfNew";

export default () => {
  const defaultDelay = 60000;
  const [delay, setDelay] = useState(0);
  const [timeline, setTimeline] = useState([]);
  const [etag, setEtag] = useState(null);

  // Retrieve the timeline every x seconds
  useInterval(() => {
    // The initial delay is zero so the first API call is done right away.
    // After that, all subsequent calls must be done according to the defaultDelay.
    if (delay !== defaultDelay) setDelay(defaultDelay);

    // Call the API to get the timeline.
    getIfNew(settings.timelineUrl, etag).then(result => {
      console.log("hiero", result);

      if (result.isNew) {
        setTimeline(result.data);
        setEtag(result.etag);
      }
    });
  }, delay);

  const addPost = content => {
    // Remember the timeline before the new post is added.
    const prevTimeline = timeline;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic updates")
    let newPost = { user: settings.user, content };
    setTimeline([newPost, ...timeline]);

    // Post the new post to the API.
    newPost = { content };
    axios.post(settings.postsUrl, newPost).catch(error => {
      // Posting to the API failed so "rollback" the state to the previous posts.
      setTimeline(prevTimeline);
      console.log(error, error.request, error.response, error.config);
    });
  };

  return [timeline, addPost];
};
