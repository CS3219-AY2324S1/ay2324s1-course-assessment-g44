import axios from "axios";

const basePath = "http://localhost:4200/api";

export const registerUser = async (req) => {
    const res = await axios.post(`${basePath}/registerUser`, req);
    console.log(res);
    return res;
  };
  