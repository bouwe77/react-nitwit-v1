import { unfollowUrl, delete2 } from "./common";

export function saveUnfollow(username, unfollowUsername) {
  const url = unfollowUrl(username, unfollowUsername);
  delete2(url);
}
