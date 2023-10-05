import axios from "axios";

const basePath = "http://localhost:4200/api";

export const createUserApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/createUser`, req);
    return res;
  } catch (error) {
    return "error";
  }
};

export const loginUserApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/loginUser`, req);
    console.log(res.status)
    return res;
  } catch (error) {
    return "error";
  }
};
  
  