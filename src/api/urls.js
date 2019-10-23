const apiHostname = "https://nitwit-api.azurewebsites.net";

export function getTimelineUrl(username) {
  return `${apiHostname}/users/${username}/timeline`;
}

export function addPostUrl(username) {
  return `${apiHostname}/users/${username}/posts`;
}

export function getFollowingUrl(username) {
  return `${apiHostname}/users/${username}/following`;
}

export function getUnfollowUrl(username, unfollowUsername) {
  return `${apiHostname}/users/${username}/following/${unfollowUsername}`;
}
