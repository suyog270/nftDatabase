const express = require("express")
const cors = require('cors')
const multer = require("multer")
const port = 3001
const fs = require("fs")
const server = new express()
const path = require("path")
require("dotenv").config()

server.use('/images', express.static(path.join(__dirname, 'images')));

const mongoose = require("mongoose")

const storage = multer.diskStorage({
    destination: "./images",
    filename: function (req, file, cb) {
        const fileName = file.originalname
        console.log(fileName.replace(/\s/g, '-'))
        cb(null, `${Date.now()}${path.extname(fileName)}`)
    }
})

const upload = multer({ storage })


const bodyParser = require("body-parser")
server.use(bodyParser.json());
server.use(cors());


server.post("/db", upload.single('image'), (req, res) => {
    const tokenId = req.body.tokenId
    const name = req.body.name


    console.log(req.file.filename)

})


server.listen(port, () => {
    console.log("Server running!")
    console.log("http://localhost:" + port)
})