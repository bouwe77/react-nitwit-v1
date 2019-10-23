import { getFollowingUrl } from "./urls";
import { post } from "./common";

export function saveFollow(username, follow) {
  const url = getFollowingUrl(username);
  post(url, follow);
}
