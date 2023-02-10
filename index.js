const path = require("path");
const sqlite = require("sqlite3").verbose();
const dbFile = path.join(__dirname, "foo.db");
const db = new sqlite.Database(dbFile, (error) => {
  if (error) return console.error(error.message);
  console.log(`Connected to database ${dbFile}`);
});

const login = (request, response) => {
    // Parse the id to generate a SQLite query
    const username = request.params.username;
    const password = request.params.password;
    const query = `SELECT * FROM user WHERE username = ?`;
    db.get(query, [username], (error, result) => {
      if (error) {
        console.error(error.message);
        response.status(400).json({ error: error.message });
        return;
      }
      // If nothing is returned, then result will be undefined
      if (result) {
        if(json(result)['password']= password){
            passwordcheck = {"correct_password":true}
            response.passwordcheck
        }
        else{
            passwordcheck = {"correct_password":false}
        }
      } else {
        response.sendStatus(404);
      }
    });
  };

  const getHighScore = (request, response) => {
    // Parse the id to generate a SQLite query
    const username = request.params.username;
    const query = `SELECT highscore FROM user WHERE username = ?`;
    db.get(query, [username], (error, result) => {
      if (error) {
        console.error(error.message);
        response.status(400).json({ error: error.message });
        return;
      }
      if (result) {
        response.json(result);
      }else {
        response.sendStatus(404);
      }
    });
  };

  const changePassword = (request, response) => {
    // Parse the id to generate a SQLite query
    const username = request.params.username;
    const password = request.params.password;
    const newpassword = request.params.newpassword;
    const query = `UPDATE user SET password = ? WHERE username = ? and password = ?`;
    db.get(query, [newpassword, username, password], (error, result) => {
      if (error) {
        console.error(error.message);
        response.status(400).json({ error: error.message });
        return;
      }
      // If nothing is returned, then result will be undefined
      if (result) {
        passwordchange = {"successful_change":true}
        response.passwordchange
      } else {
        response.sendStatus(404);
      }
    });
  };

  module.exports = {
    login,
    getHighScore,
    changePassword,
  };