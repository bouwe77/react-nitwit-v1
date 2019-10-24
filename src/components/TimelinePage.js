// ==============================================================
// Deze TimelinePage gebruiken bij de ADVANCED als uitgangspunt.
// De opdracht is dan om dit te vervangen door useInterval,
// net zoals de eindopdracht van de FOUNDATION...
// ==============================================================

import React from "react";

import settings from "../settings";
import Timeline from "./timeline/Timeline";

function TimelinePage() {
  return <Timeline username={settings.username} />;
}

export default TimelinePage;
