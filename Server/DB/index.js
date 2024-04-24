const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const pool = mysql.createPool({
    host: "mysql-db7f0b8-gautamyadav1992002-86ff.d.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_zGcvUwQvuo4ajQUSjOk",
    database: "mydb",
    connectionLimit: 10,
    port: 28220,
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