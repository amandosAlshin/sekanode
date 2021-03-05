import mysql from 'mysql';
const util = require('util');
import {asmazirDB} from '../config/vars.js';
const db = mysql.createConnection({
    host: asmazirDB.host,
    user:  asmazirDB.user,
    password:  asmazirDB.password,
    database:  asmazirDB.database,
});

// connect to database
db.connect((err) => {
    if (err) {
        console.log('error mysql connect',err);
        return err;
    }
    console.log('asmazir db connected');
});
db.query = util.promisify(db.query);
export default db;
