import { timelineUrl, getWithEtag, get } from "./common";

export async function getTimelineWithEtag(username, etag) {
  const url = timelineUrl(username);
  return await getWithEtag(url, etag);
}

export async function getTimeline(username) {
  const url = timelineUrl(username);
  return await get(url);
}
