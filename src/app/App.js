import React, { useState } from "react";

import Header from "./Header";
import Container from "./Container";
import TimelinePage from "../timeline";
import FollowingPage from "../following/";

function App() {
  const [showTimeline, setShowTimeline] = useState(true);

  return (
    <div className="app">
      <Header
        showTimeline={() => setShowTimeline(true)}
        showFollowing={() => setShowTimeline(false)}
      />
      <Container>
        <div className="container">{showTimeline ? <TimelinePage /> : <FollowingPage />}</div>
      </Container>
    </div>
  );
}

export default App;
