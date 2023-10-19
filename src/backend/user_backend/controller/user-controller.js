const { useRandomClassName } = require("@mantine/core");
const pool = require("../server");
const {
  isDuplicateEmail,
  isExistingUser,
  isCorrectPassword,
} = require("../utils/validation");
const jwt = require("jsonwebtoken");

const EXPIRATION_TIME = 15 * 60; // 15 min
const JWT_SECRET_KEY = "iloveJWT";
const ROLE = "user";

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isDuplicate = await isDuplicateEmail(email);
    if (isDuplicate) {
      return res.status(401).send();
    } else {
      await pool.query(
        `INSERT INTO Users(email_address, username, password, role) VALUES ('${email}', '${username}', '${password}', '${ROLE}')`
      );
      return res.status(201).send();
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
    const isExisting = await isExistingUser(email, password);
    if (!isExisting) {
      return res.status(401).send();
    } else {
      const userInfo = await pool.query(
        `SELECT username, role FROM Users where email_address = '${email}'`
      );
      const username = userInfo.rows[0].username;
      // const password = userInfo.rows[0].password;
      const role = userInfo.rows[0].role; // admin or user
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
