import axios from "axios";

const basePath = "http://localhost:4000/api";

export const registerUser = async (req) => {
    const res = await axios.post(`${basePath}/register`, req);
    console.log(res);
    return res;
  };
  