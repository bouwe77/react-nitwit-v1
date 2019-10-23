import { getFollowingUrl, post } from "./common";

export function saveFollow(username, follow) {
  const url = getFollowingUrl(username);
  post(url, follow);
}
