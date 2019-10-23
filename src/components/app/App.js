import React, { useState } from "react";

import Header from "./Header";
import Container from "./Container";
//import TimelinePage from "../TimelinePage";
import TimelinePage from "../TimelinePage-NoPolling";
import FollowingPage from "../FollowingPage";

function App() {
  const [showTimeline, setShowTimeline] = useState(true);

  return (
    <div className="app">
      <Header
        showTimeline={() => setShowTimeline(true)}
        showFollowing={() => setShowTimeline(false)}
      />
      <Container>{showTimeline ? <TimelinePage /> : <FollowingPage />}</Container>
    </div>
  );
}

export default App;
