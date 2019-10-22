import axios from "axios";

//TODO Rename this function
//TODO Is my usage of promises OK?

export function getIfNew(url, etag) {
  const result = axios
    .get(url, {
      headers: { "If-None-Match": etag },
      validateStatus: function(status) {
        return status < 400; // This means all status codes below 400 are valid
      }
    })
    .then(res => {
      let result = { isNew: false, etag, data: null };

      if (etag !== res.headers.etag) {
        result.isNew = true;
        result.etag = res.headers.etag;
      }
      if (res.status === 200) {
        result.data = res.data;
      }

      return result;
    })
    .catch(error => {
      console.log(error, error.request, error.response, error.config);
    });

  return result;
}
