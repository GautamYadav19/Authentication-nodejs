const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const { throwError } = require("rxjs");
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
  port: process.env.MYSQL_PORT
  });
  let rootdb = {};
  
  rootdb.login = (username, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password],
        (err, results) => {
          if (err) {
            console.log(err);
  
            return reject(err);
          } else if (!results.length) {
            console.log("else if  ", results);
            pool.query(
              `select count(1) from users where username =?`,
              [username],
              (err, result) => {
                if (err) {
                  return reject({ status: 0, data: err });
                }
                return resolve({
                  status: 0,
                  data: ["Incorrect_password"],
                });
              }
            );
            return resolve({
              status: 0,
              data: ["No_user_exist"],
            });
          } else {
            console.log("hey ", results);
            let token = jwt.sign({ data: results }, "secret");
            const user = { status: 1, data: results, token: token };
            return resolve(user);
          }
        }
      );
    });
  };

  module.exports = rootdb;