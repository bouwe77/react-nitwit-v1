import { getFollowingUrl } from "./urls";
import { get } from "./common";

export function getFollowing(username) {
  const url = getFollowingUrl(username);
  return get(url);
}
