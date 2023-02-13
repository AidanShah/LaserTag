const express = require("express");
const app = express();
const db = require("./db");
const PORT = 4000;

app.use(express.json());


app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:8080",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/", (req, res) => {
  res.json({ info: "Demo app for sqlite3" });
});

app.get("/login/:username/:password", db.login)
app.get("/highscore/:username", db.getHighScore)
app.put("/change/:username/:password/:newpassword", db.changePassword)

// ------ FILL IN BELOW -------
// Write endpoints that allow a client to:

//-----------------------------
//#region Server
//-----------------------------
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
//#endregion Server
