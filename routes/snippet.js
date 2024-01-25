const express = require("express");
const router = express.Router();
const { encrypt, decrypt } = require("../utils/encrypt");
const { requiresAuth } = require("express-openid-connect");

const rawSnippets = require("./seedData.json");
const { parse } = require("dotenv");

//encrypts code content
const snippets = rawSnippets.map((snippet) => ({
  ...snippet,
  code: encrypt(snippet.code),
}));

let id = snippets.length;

//get all snippets
router.get("/", requiresAuth(), (req, res) => {
  const { lang } = req.query;
  const decodedSnippets = snippets.map((snippet) => ({
    ...snippet,
    code: decrypt(snippet.code),
  }));
  if (lang) {
    const languageSnippet = snippets.filter(
      (item) => lang.toLowerCase() === item.language.toLowerCase()
    );
    res.send(languageSnippet);
  } else {
    res.send(decodedSnippets);
  }
});

//get one snippet
router.get("/:id", requiresAuth(), (req, res) => {
  const updatedId = parseInt(req.params.id) - 1;
  filteredSnippet = snippets[updatedId];
  filteredSnippet.code = decrypt(filteredSnippet.code);
  res.json(filteredSnippet);
});

//create a new snippet
router.post("/", requiresAuth(), (req, res) => {
  const { language, code } = req.body;
  const newSnippet = {
    id: ++id,
    language,
    code,
  };
  snippets.push({ ...newSnippet, code: encrypt(code) });
  res.status(201).json(newSnippet);
});

module.exports = router;
