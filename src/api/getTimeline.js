import { getTimelineUrl, getWithEtag, get } from "./common";

export async function getTimelineWithEtag(username, etag) {
  const url = getTimelineUrl(username);
  return await getWithEtag(url, etag);
}

export async function getTimeline(username) {
  const url = getTimelineUrl(username);
  return await get(url);
}
