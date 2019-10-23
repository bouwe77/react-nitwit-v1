import axios from "axios";

const apiHostname = "https://nitwit-api.azurewebsites.net";

/**
 * Returns the URL where to issue timeline requests to.
 * @param {string} username
 */
export function timelineUrl(username) {
  return `${apiHostname}/users/${username}/timeline`;
}

/**
 * Returns the URL where to issue posts requests to.
 * @param {string} username
 */
export function postsUrl(username) {
  return `${apiHostname}/users/${username}/posts`;
}

/**
 * Returns the URL where to issue follow requests to.
 * @param {string} username
 */
export function followingUrl(username) {
  return `${apiHostname}/users/${username}/following`;
}

/**
 * Returns the URL where to issue unfollow requests to.
 * @param {string} username
 * @param {string} unfollowUsername
 */
export function unfollowUrl(username, unfollowUsername) {
  return `${apiHostname}/users/${username}/following/${unfollowUsername}`;
}

/**
 * Issues an HTTP GET with an ETag header to the given URL.
 * The result only contains data when the ETag differs between client and server.
 * @param {string} url
 * @param {string} etag
 */
export async function getWithEtag(url, etag) {
  try {
    const res = await axios.get(url, {
      // Add a header to let the server know what's the version on the client.
      headers: { "If-None-Match": etag },
      validateStatus: function(status) {
        return status < 400; // This means all status codes below 400 are valid
      }
    });
    // Return a boolean indicating the data has changed.
    // And if so, also return the data itself and the new etag.
    return etag !== res.headers.etag && res.status === 200
      ? { isNew: true, etag: res.headers.etag, data: res.data }
      : { isNew: false };
  } catch (error) {
    handleError(error);
  }
}

/**
 * Issues an HTTP GET request to the URL.
 * @param {string} url
 */
export async function get(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

/**
 * Issues an HTTP POST request with the data to the URL.
 * @param {string} url
 * @param {object} data
 */
export function post(url, data) {
  return axios.post(url, data).catch(error => {
    handleError(error);
  });
}

/**
 * Issues an HTTP DELETE request to the URL.
 * Note: delete is a reserved keyword, hence the name delete2...
 * @param {string} url
 */
export function delete2(url) {
  return axios.delete(url).catch(error => {
    handleError(error);
  });
}

function handleError(error) {
  console.log(error.response.status, error, error.request, error.response, error.config);
  throw error;
}
