import { followingUrl, get } from "./common";

export function getFollowing(username) {
  const url = followingUrl(username);
  return get(url);
}
