import axios from "axios";
import config from "../Config/config";

export default function apiCaller({ url, method, headers, data}) {
  try {
    const res = axios(config.backendUrl + url, {
      method: method,
      headers: headers,
      data:data,
    });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
