import axios from "axios";

const basePath = "http://localhost:6969/api/code";

export const submitCodeApi = async (req) => {
  try {
    console.log("req: ", req);
    const response = await axios.post(`${basePath}/createSubmission`, req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return "error";
  }
};

export const getCodeResultApi = async (req) => {
  try {
    const response = await axios.get(`${basePath}/getSubmission/${req}`);
    return response.data;
  } catch (error) {
    return "error";
  }
};

