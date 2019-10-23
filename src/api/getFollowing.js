import { getFollowingUrl, get } from "./common";

export function getFollowing(username) {
  const url = getFollowingUrl(username);
  return get(url);
}
