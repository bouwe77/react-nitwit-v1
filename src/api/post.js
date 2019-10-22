import axios from "axios";
import { handleError } from "./utils";

export function post(url, data) {
  return axios.post(url, data).catch(error => {
    handleError(error);
  });
}
