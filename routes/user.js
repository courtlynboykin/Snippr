const express = require("express");
const router = express.Router();
const basicAuth = require("../middleware/basicAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorization");

const users = [];
let id = users.length + 1;

// When a POST request is made to /user with email and password in the body, the password should be salted and hashed before the user is saved in the data store.
router.post("/", basicAuth, async (req, res) => {
  const { email, password } = req.user;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: ++id,
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  res.status(201).json({ id, email });
});

//When a user logs in they are given a token
// The token allows the user to authorize further requests to the API without repeating their password
router.post("/login", basicAuth, async (req, res) => {
  try {
    const user = users.find((user) => user.email === req.user.email);
    if (!user) {
      return res.status(401).send({ error: "Invalid username or password" });
    }
    let correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      res.status(401).json("Invalid username or password");
    } else {
      //The user provides their email and password to authenticate and receives a token in exchange
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env["JWT_SECRET"],
        { expiresIn: "24h" }
      ); // The token expires after 24 hours
      res.json({ success: true, data: { token } });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Users can access secured resources with their token just as they could using their password in the previous epic
router.get("/", authorize, async (req, res) => {
  res.json(req.user);
});

module.exports = router;