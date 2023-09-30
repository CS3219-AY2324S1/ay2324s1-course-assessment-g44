const pool = require("../server");
const { isDuplicateEmail, isExistingUser, isCorrectPassword } = require("../validation");

exports.createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const isDuplicate = await isDuplicateEmail(email);
        if (isDuplicate) {
            return res.status(401).send();
        } else {
            await pool.query(`INSERT INTO Users VALUES ('${email}', '${username}', '${password}')`);
            return res.status(201).send();
        }
    } catch (err) {
        console.log(err.message);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const isExisting = await isExistingUser(email, password);
        if (!isExisting) {
            return res.status(401).send(); 
        } else {
            return res.status(201).send();
        }
    } catch (err) {
        console.log(err.message)
    }
}

exports.getUser = async (req, res) => {
    try {
        const {email} = req.body;
        const userInfo = await pool.query(`SELECT * FROM Users where email_address = '${email}'`);
        return res.status(201).send();
    } catch (err) {
        console.log(err.message)
    }
}





