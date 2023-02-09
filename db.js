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

app.get("/login/:username/:password", db.getUserById)

// ------ FILL IN BELOW -------
// Write endpoints that allow a client to:

// Get all users
app.get("/users", db.getAllUsers)
// Create a new user
app.get("/create/:id/:name",
  db.createUser)
// Update a user's name, given an idi

app.get("/update/:name/:id", db.updateUser);
// Delete a user by id
app.get("/delete/:id", db.deleteUserById);
//#endregion Database Routes

//-----------------------------
//#region Server
//-----------------------------
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
//#endregion Server
