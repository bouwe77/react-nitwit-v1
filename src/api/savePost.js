import { addPostUrl } from "./urls";
import { post } from "./common";

export function savePost(username, postToAdd) {
  const url = addPostUrl(username);
  return post(url, postToAdd);
}
