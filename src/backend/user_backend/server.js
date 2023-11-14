const Pool = require('pg').Pool;
require('dotenv').config({path: './.env'});
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: 5432,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

module.exports = pool;

