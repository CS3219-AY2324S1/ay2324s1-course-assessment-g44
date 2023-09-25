const pool = require("../server");

exports.createUser = async (req, res) => {
    try {
        const {username, email} = req.body;
        let newUser = await pool.query(`INSERT INTO Users VALUES ("${username}", "${email}")`);
        return res.status(201).send({
            message: `User ${newUser.rows}`,
        })
    } catch (err) {
        console.log(err.message);
    }
};



