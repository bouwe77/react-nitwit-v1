import axios from "axios";

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

export async function get(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export function post(url, data) {
  return axios.post(url, data).catch(error => {
    handleError(error);
  });
}

export function handleError(error) {
  console.log(error, error.request, error.response, error.config);
  throw error;
}
