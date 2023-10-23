import axios from "axios";

const basePath = "http://localhost:4200/api/users";

export const createUserApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/createUser`, req);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/updateUser`, req);
    return res;
  } catch (error) {
    return "error";
  }
};

export const loginUserApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/loginUser`, req);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/getUser`, null, req);
    return res;
  } catch (error) {
    return "error";
  }
};

export const deleteUserApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/deleteUser`, req);
    return res;
  } catch (error) {
    return "error";
  }
}
  
export const userMarkQuestionAsCompletedApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/userMarkQuestionAsCompleted`, req);
    return res;
  } catch (error) {
    return "error";
  }
};