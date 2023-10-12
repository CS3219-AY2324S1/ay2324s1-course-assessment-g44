const pool = require("../server");
const { isDuplicateEmail, isExistingUser, isCorrectPassword } = require("../validation");

exports.createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        console.log(password)
        const isDuplicate = await isDuplicateEmail(email);
        if (isDuplicate) {
            console.log('duplicate email');
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





