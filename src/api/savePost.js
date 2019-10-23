import { postsUrl, post } from "./common";

export function savePost(username, postToAdd) {
  const url = postsUrl(username);
  return post(url, postToAdd);
}
