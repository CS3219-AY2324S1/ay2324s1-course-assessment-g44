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
    return res.data;
  } catch (error) {
    return error.response.data;
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
    return res.data;
  } catch (error) {
    return error.response.data;
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

export const isUserOrAdminApi = async (req) => {
  try {
    await axios.post(`${basePath}/isAdminOrUser`, req);
    return true;
  } catch (error) {
    return false;
  }
}
  
export const userMarkQuestionAsCompletedApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/userMarkQuestionAsCompleted`, req);
    console.log(res);
    return res;
  } catch (error) {
    return "error";
  }
};

export const userMarkQuestionAsIncompleteApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/userMarkQuestionAsIncomplete`, req);
    console.log(res);
    return res;
  } catch (error) {
    return "error";
  }
};

export const submitAttemptApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/submitAttempt`, req);
    return res;
  } catch (error) {
    return "error";
  }
}

export const getAttemptsApi = async (req) => {
  try {
    const res = await axios.get(`${basePath}/getAttempts`, {
      params: {email: req.email}
    }).then(result => {
      console.log(result);
      return result;
    });
    return res; 
  } catch (error) {
    return "error";
  }
}

