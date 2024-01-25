require("dotenv").config();
const express = require("express");
const routes = require("./routes");
// require express-openid-connect and destructure auth from it
const { auth } = require("express-openid-connect");

const app = express();
const port = 3000;

// destructures config environment variables from process.env
const { AUTH0_SECRET, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_BASE_URL } =
  process.env;
// defines the config object
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_AUDIENCE,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_BASE_URL,
};

app.use(express.json());
// attaches Auth0 OIDC auth router
app.use(auth(config));

app.use("/user", routes.user);
app.use("/snippet", routes.snippet);

app.get("/", (req, res) => {
  res.send(`<div>
<h1>Welcome to Snippr!</h1>
<p>Our app allows you to keep your code snippets safe.</p>
</div>`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});