import { getTimelineUrl, getWithEtag, get } from "./common";

export async function getTimeline(username, etag = null) {
  const url = getTimelineUrl(username);
  return etag ? await getWithEtag(url, etag) : await get(url);
}
