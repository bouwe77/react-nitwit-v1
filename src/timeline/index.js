import React from "react";

import Posts from "./Posts";
import Compose from "./Compose";
import useTimeline from "./useTimeline";

function TimelinePage() {
  const [timeline, addPost] = useTimeline();

  return (
    <>
      <Compose addPost={addPost} />
      <Posts posts={timeline} />
    </>
  );
}

export default TimelinePage;
