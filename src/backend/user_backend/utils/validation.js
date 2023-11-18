const pool = require("../server");

exports.isDuplicateEmail = async (email) => {
  const duplicates = await pool.query(
    `SELECT * FROM Users where email_address = '${email}'`
  );

  return duplicates.rowCount > 0;
};

exports.isExistingUser = async (email) => {
  const user = await pool.query(
    `SELECT * FROM Users where email_address = '${email}'`
  );
  return user.rowCount > 0;
};

exports.isExistingUsername = async (username) => {
  const userName = await pool.query(
    `SELECT * FROM Users where username = '${username}'`
  );
  return userName.rowCount > 0;
};
