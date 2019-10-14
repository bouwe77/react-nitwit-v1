import React from "react";

import Timeline from "./Timeline";
import Compose from "./Compose";
import useTimeline from "./useTimeline";

function TimelinePage() {
  const [timeline, addPost] = useTimeline();

  return (
    <>
      <Compose addPost={addPost} />
      <Timeline posts={timeline} />
    </>
  );
}

export default TimelinePage;
