import { getUnfollowUrl } from "./urls";
import { delete2 } from "./common";

export function saveUnfollow(username, unfollowUsername) {
  const url = getUnfollowUrl(username, unfollowUsername);
  delete2(url);
}
