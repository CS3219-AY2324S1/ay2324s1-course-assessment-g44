const pool = require('./server')

exports.isDuplicateEmail = async (email) => {
    const duplicates = await pool.query(`SELECT * FROM Users where email_address = '${email}'`);
    
    return duplicates.rowCount > 0
}

exports.isExistingUser = async (email, password) => {
    const user = await pool.query(`SELECT * FROM Users where email_address = '${email}' and password = '${password}'`)
    return user.rowCount > 0
} 
