const axios = require("axios");
require("dotenv").config({path: './.env'});
const ERR_MESSAGE = "Server error. Try again later!";

exports.getLanguages = async (req, res) => {
  const options = {
    method: "GET",
    url: `${process.env.URL}/languages`,
    headers: {
      "X-RapidAPI-Key": process.env.KEY,
      "X-RapidAPI-Host": process.env.HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      message: "Messages successfully retrieved",
      body: response.data,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send(ERR_MESSAGE);
  }
};

exports.getLanguage = async (req, res) => {
  const options = {
    method: "GET",
    url: `${process.env.URL}/languages/${req.params.id}`,
    headers: {
      "X-RapidAPI-Key": process.env.KEY,
      "X-RapidAPI-Host": process.env.HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      message: "Language id retrieved",
      data: response.data,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send(ERR_MESSAGE);
  }
};

exports.createSubmission = async (req, res) => {
  const language_id = req.body.language_id;
  const source_code = req.body.source_code;
  const stdin = req.body.stdin;
  const options = {
    method: "POST",
    url: `${process.env.URL}/submissions`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.KEY,
      "X-RapidAPI-Host": process.env.HOST,
    },
    data: {
      language_id: language_id,
      source_code: source_code,
      stdin: stdin,
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      message: "Code successfully submitted",
      data: response.data,
    });
  } catch (error) {
    return res.status(500).send(ERR_MESSAGE);
    // console.log(error.response.data)
  }
};

exports.getSubmission = async (req, res) => {
  const token = req.params.token;

  const options = {
    method: "GET",
    url: `${process.env.URL}/submissions/${token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": process.env.KEY,
      "X-RapidAPI-Host": process.env.HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
        message: "Code output successfully retrieved!",
        body: response.data,
    });
  } catch (error) {
    return res.status(500).send(ERR_MESSAGE);
    // console.log(error);
  }
};
