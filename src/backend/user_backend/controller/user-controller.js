const pool = require("../server");
const {
  isDuplicateEmail,
  isExistingUser,
  isCorrectPassword,
} = require("../validation");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../../../../.env" });

const EXPIRATION_TIME = 15;

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isDuplicate = await isDuplicateEmail(email);
    if (isDuplicate) {
      return res.status(401).send();
    } else {
      await pool.query(
        `INSERT INTO Users VALUES ('${email}', '${username}', '${password}')`
      );
      return res.status(201).send();
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExisting = await isExistingUser(email, password);
    if (!isExisting) {
      return res.status(401).send();
    } else {
      const userInfo = await pool.query(
        `SELECT username FROM Users where email_address = '${email}'`
      );
      const username = userInfo.rows[0].username;
      const token = jwt.sign(
        { username: username, email: email },
        process.env.JWT_SECRET,
        { expiresIn: EXPIRATION_TIME }
      ); // expires in 10 seconds
      // res.cookie("token", token, { httpOnly: true }); // this is cookie implementation, but what I eventually chose is to pass by headers
      return res.status(201).json({
        username: username,
        email: email,
        accessToken: token,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    console.log(req);
    const authToken = req.headers.authorization.split(" ")[1];
    console.log(authToken);
    const user = jwt.verify(
      authToken,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).send("Token expired!");
        }
        return decoded;
      }
    );
    console.log("user:", user);
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
