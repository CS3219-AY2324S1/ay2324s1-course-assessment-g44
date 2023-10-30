const pool = require("../server");
const {
  isDuplicateEmail,
  isExistingUser,
  isExistingUsername,
} = require("../utils/validation");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");

const EXPIRATION_TIME = 15 * 60; // 15 min
const JWT_SECRET_KEY = "iloveJWT";
const ROLE = "user";

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isDuplicateEmailAddress = await isDuplicateEmail(email);
    if (isDuplicateEmailAddress) {
      return res.status(401).send("This email address has already been registered!");
    }
    const isDuplicateUsername = await isExistingUsername(username);
    if (isDuplicateUsername) {
      return res.status(401).send("This username is already in use, please pick another username!");
    } else {
      const newId = uuidv4();
      await pool.query(
        `INSERT INTO Users VALUES ('${email}', '${username}', '${password}', '${newId}', '${ROLE}')`
      );
      return res.status(201).send("User created!");
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    await pool.query(
      `UPDATE Users SET username = '${username}', password = '${password}' WHERE email_address = '${email}'`
    )
    return res.status(201).send();
  } catch (err) {
    console.log(err.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExisting = await isExistingUser(email);
    console.log("does this email exist: ", isExisting);
    if (!isExisting) {
      return res.status(401).send("This account has not been registered, please sign up first!");
    } else {
      const userInfo = await pool.query(
        `SELECT username, role, completed_questions FROM Users where email_address = '${email}' and password = '${password}'`
      );
      if (userInfo.rowCount == 0) {
        return res.status(401).send("Incorrect email or password provided!");
      }
      const username = userInfo.rows[0].username;
      const role = userInfo.rows[0].role; // admin or user
      const completedQuestions = userInfo.rows[0].completed_questions;
      const token = jwt.sign(
        { username: username, email: email },
        JWT_SECRET_KEY,
        { expiresIn: EXPIRATION_TIME }
      ); 
      return res.status(201).json({
        username: username,
        password: password,
        email: email,
        accessToken: token,
        role: role,
        completedQuestions: completedQuestions,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(
      authToken,
      JWT_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res.status(403).send("Token expired!");
        }
        return decoded;
      }
    );
    const email = user.email;
    const userInfo = await pool.query(
      `SELECT * FROM Users where email_address = '${email}'`
    );
    return res.status(201).send({
      message: userInfo,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteUser = async(req, res) => {
    try {
        const { email, username, password } = req.body;
        await pool.query(`DELETE FROM Users WHERE username = '${username}' AND password = '${password}' AND email_address = '${email}'`);
        return res.status(200).send('User is successfully deleted!');
    } catch (err) {
        console.log(err.message);
    }
}


exports.userMarkQuestionAsCompleted = async (req, res) => {
  try {
    const { email, questionId } = req.body;
    console.log(typeof questionId);
    console.log(req.body)
    await pool.query(
      `UPDATE Users SET completed_questions =  ARRAY_APPEND(completed_questions, '${questionId}') WHERE email_address = '${email}'`
    )
    return res.status(201).send({
      message: questionId
    });
  } catch (err) {
    console.log(err.message);
  }
};


exports.userMarkQuestionAsIncomplete = async (req, res) => {
  try {
    const { email, questionId } = req.body;
    // console.log(typeof questionId);
    // console.log(req.body)
    await pool.query(
      `UPDATE Users SET completed_questions =  ARRAY_REMOVE(completed_questions, '${questionId}') WHERE email_address = '${email}'`
    )
    return res.status(201).json({
      message: questionId,
    });
  } catch (err) {
    console.log(err.message);
  }
};


// exports.getUserInfo = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await pool.query(
//       `SELECT email_address FROM Users WHERE email_address = '${email}'`
//     )
//     console.log(user);
//     return res.status(201).send({
//       message: user,
//     });
//   } catch (err) {
//     console.log(err.message);
//   }

// }