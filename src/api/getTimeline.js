import { getWithEtag } from "./common";
import { getTimelineUrl } from "./urls";

export async function getTimeline(username, etag) {
  const url = getTimelineUrl(username);
  return await getWithEtag(url, etag);
}
