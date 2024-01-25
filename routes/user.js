const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

//After user logs in they see their profile information
//After logging out they get a successful message
router.get("/", requiresAuth(), async (req, res) => {
  res.send(
    req.oidc.isAuthenticated()
      ? `<div>
    <h1>Snippr</h1>
    <h2>Welcome, ${req.oidc.user.name}!</h2>
    <h3>Username: ${req.oidc.user.nickname}</h3>
    <img src=${req.oidc.user.picture} alt="my photo">
  </div>`
      : "Logged out"
  );
});

module.exports = router;