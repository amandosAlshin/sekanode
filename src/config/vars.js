const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example')
});

module.exports = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  asmazirDB:{
    host: process.env.MYSQL_ASMAZIR_HOST,
    user: process.env.MYSQL_ASMAZIR_USER,
    password: process.env.MYSQL_ASMAZIR_PASSWORD,
    database: process.env.MYSQL_ASMAZIR_DB
  },
};
