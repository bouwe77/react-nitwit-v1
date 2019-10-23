import React from "react";

import Posts from "./posts/Posts";
import Compose from "./compose/Compose";
import useTimeline from "./timeline/useTimeline";
import settings from "../settings";

function TimelinePage() {
  const [timeline, addPost] = useTimeline(settings.user);

  return (
    <>
      <Compose addPost={addPost} />
      <Posts posts={timeline} />
    </>
  );
}

export default TimelinePage;
