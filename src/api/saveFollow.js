import { followingUrl, post } from "./common";

export function saveFollow(username, follow) {
  const url = followingUrl(username);
  post(url, follow);
}
