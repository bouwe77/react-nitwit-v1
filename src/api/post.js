import axios from "axios";
import { handleError } from "./utils";

export function post(url, data) {
  return (
    axios
      .post(url, data)
      //.then(() => console.log("post klaar..."))
      .catch(error => {
        handleError(error);
      })
  );
}
