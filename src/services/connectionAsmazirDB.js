const mariadb = require('mariadb/callback');
const { promisify } = require('util')
import {asmazirDB} from '../config/vars.js';


const db = mariadb.createConnection({
    host: asmazirDB.host,
    user:   asmazirDB.user,
    database: asmazirDB.database,
    password: asmazirDB.password,
    });
db.connect(err => {
  if (err) {
    console.log("not connected due to error: " + err);
  } else {
    console.log("connected ! connection id is " + conn.threadId);
  }
});
db.query = promisify(db.query);
export default db;
