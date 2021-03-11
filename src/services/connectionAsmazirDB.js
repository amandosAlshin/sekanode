const mariadb = require('mariadb/callback');
const util = require('util');
import {asmazirPsDB} from '../config/vars.js';
const db = mariadb.createConnection({
    host: asmazirPsDB.host,
    user:  asmazirPsDB.user,
    password:  asmazirPsDB.password,
    database:  asmazirPsDB.database,
});

// connect to database
db.connect((err) => {
    if (err) {
        console.log('error mariadb connect',err);
        return err;
    }
    console.log('asmazir db connected');
});
db.query = util.promisify(db.query);
export default db;
