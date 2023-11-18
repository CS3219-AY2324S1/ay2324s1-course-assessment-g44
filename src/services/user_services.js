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
    // console.log(req.token);
    const res = await axios.patch(`${basePath}/updateUser/${req.token}`, req);
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
    const token = JSON.stringify(req)
    const res = await axios.get(`${basePath}/getUser/${token}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUserApi = async (req) => {
  try {
    const res = await axios.delete(`${basePath}/deleteUser/${req.token}`, req);
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
      return result;
    });
    return res; 
  } catch (error) {
    return "error";
  }
}

export const getQuestionsAttemptedPerUserApi = async (req) => {
  try {
    const res = await axios.get(`${basePath}/getQuestionsAttemptedPerUser`).then(result => {
      return result;
    });
    return res; 
  } catch (error) {
    return "error";
  }
}

export const getAttemptsPerQuestionApi = async (req) => {
  try {
    const res = await axios.get(`${basePath}/getAttemptsPerQuestion`).then(result => {
      return result;
    });
    return res; 
  } catch (error) {
    return "error";
  }
}

export const getLanguageUsageApi = async (req) => {
  try {
    const res = await axios.get(`${basePath}/getLanguageUsage`).then(result => {
      return result;
    });
    return res; 
  } catch (error) {
    return "error";
  }
}
