const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(express.static('Pics'))

const {tricks} = require("./data")

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/Welcome.html"))
})

app.get("/css", (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/styles.css"))
})

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/index.js"))
})

app.get("/tricks", (req, res) => res.status(200).send(tricks))

app.put("/tricks/:id", (req, res) => {
    let type = req.body.type
    let id = req.params.id
    let index = tricks.findIndex(element => element.id === +id)

    if(type === 'plus'){
        tricks[index].difficulty++
        res.status(200).send(tricks[index])
    } else if (type === 'minus'){
        tricks[index].difficulty--
        res.status(200).send(tricks[index])
    } else {
        res.sendStatus(400)
    }
})

app.post('/tricks', (req, res) => {
    const file = req.files.gif
    const {name, difficulty, gifAddress} = req.body

    let greatestId = -1
    for(let i = 0; i < tricks.length; i++){
        if(tricks[i].id > greatestId){
            greatestId = tricks[i].id
        }
    }
    let nextId = greatestId + 1

    let newTrick = {
        id: nextId,
        name,
        difficulty,
        gifAddress
    }

    tricks.push(newTrick)
    res.status(200).send(tricks)
})

const {PORT} = process.env

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))