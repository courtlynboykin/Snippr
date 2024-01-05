const express = require('express')
const app = express()
const port = 3000
const snippet = require('./seedData.json')

app.use(express.json())

let id = snippet.length



// Users can make a GET request to /snippet to get all the snippets currently in the data store
//BONUS
app.get('/snippet', (req, res) => {
    const { lang } = req.query
    if(lang){
       const languageSnippet = snippet.filter(item => lang.toLowerCase() === item.language.toLowerCase()) 
       res.send(languageSnippet)
    } else {
        res.send(snippet) 
    }
})

// Users can make a GET request to e.g. /snippet/3 to retrieve the snippet with the ID of 3
app.get('/snippet/:id', (req, res) => {
    filteredSnippet = snippet[req.params.id]
    res.send(filteredSnippet)
})

// Users can make POST request to /snippet to create a new snippet
app.post('/snippet', (req, res) => {
    const { language, code } = req.body
    const newSnippet = {
        id: ++id,
        language,
        code
    }
    snippet.push(newSnippet)
    res.send(newSnippet)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })