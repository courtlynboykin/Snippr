const express = require('express')
const router = express.Router()
const { encrypt, decrypt } = require('../utils/encrypt')
const rawSnippets = require('./seedData.json')

//encrypts code content
const snippets = rawSnippets.map(snippet => ({
    ...snippet,
    code: encrypt(snippet.code)
}))

let id = snippets.length

// Users can make a GET request to /snippet to get all the snippets currently in the data store
// When a GET request is made to /snippet (or any subroute), the code content should be decrypted before returning
router.get('/', (req, res) => {
    const { lang } = req.query
    // console.log(snippets)
    const decodedSnippets = snippets.map(snippet => ({
        ...snippet,
        code: decrypt(snippet.code)
}))
    if(lang){
       const languageSnippet = snippets.filter(item => lang.toLowerCase() === item.language.toLowerCase()) 
       res.json(languageSnippet)
    } else {
        res.json(decodedSnippets) 
    }
})

// Users can make a GET request to e.g. /snippet/3 to retrieve the snippet with the ID of 3
// When a GET request is made to /snippet (or any subroute), the code content should be decrypted before returning
router.get('/:id', (req, res) => {
    filteredSnippet = snippets[req.params.id]
    filteredSnippet.code = decrypt(filteredSnippet.code)
    res.json(filteredSnippet)
})

// Users can make POST request to /snippet to create a new snippet
//When a POST request is made to /snippet, the code content of the body should be encrypted before saving in the datastore
router.post('/', (req, res) => {
    const { language, code } = req.body
    const newSnippet = {
        id: ++id,
        language,
        code
    }
    snippets.push({...newSnippet, code: encrypt(code)})
    res.status(201).json(newSnippet)
})

module.exports = router