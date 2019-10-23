import {delete} from "./common"

export function saveUnfollow(username, unfollowUsername) {
  const url = getUnfollowUrl(username, unfollowUsername);
  delete(url);
}
