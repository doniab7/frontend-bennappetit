import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default axios.create({
  baseURL: BASE_URL,
});
