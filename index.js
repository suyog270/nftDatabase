const express = require("express")
const cors = require('cors')
const multer = require("multer")
const fs = require("fs")
const port = 3001

const server = new express()
const path = require("path")



server.use('/images', cors(), express.static(path.join(__dirname, 'images')));
server.use('/uri',cors(), express.static(path.join(__dirname, 'uri')));

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
    const imageURL = `http://localhost:${port}/images/${req.file.filename}`;
    console.log( name )
    const data = {
        "name": name,
        "Image": imageURL
    }
    console.log( data )
    const dataString = JSON.stringify(data, null, 2)


    fs.writeFile(`./uri/${tokenId}.json`, dataString, (e) => {
        if(e){
            console.log(e)
            return
        }
    });
    const uri = `http://localhost:${port}/uri/${tokenId}.json`
    console.log(uri)
    res.send({"uri": uri})
})


server.listen(port, () => {
    console.log("Server running!")
    console.log("http://localhost:" + port)
})