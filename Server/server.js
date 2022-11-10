const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const {home, style, js, axios} = require("./controller")
const {tricks} = require("./data")

app.get("/", home)
app.get("/css", style)
app.get("/js", js)
// app.get("/axios", axios)
app.use(express.static('Pics'));

let trick = [
{
    name: 'Back Tuck to Back',
    difficulty: 3,
    gifAddress: 'backTuckToBack.gif',
    Address: '20221104_181129_1.mp4',
}]

app.get("/tricks", (req, res) => {
    console.log(trick)
    res.status(200).send(trick)
})

const {PORT} = process.env

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))