import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    return res;
  } catch (error) {
    return "error";
  }
};

export const getUserApi = async (req) => {
  try {
    const res = await axios.post(`${basePath}/getUser`, req);
    return res;
  } catch (error) {
    return "error";
  }
};
  
  