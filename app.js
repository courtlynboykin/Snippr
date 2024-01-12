const express = require('express')
const app = express()
const port = 3000
const userRouter = require("./routes/user")
const snippetRouter = require("./routes/snippet")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/user', userRouter);
app.use('/snippet', snippetRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })