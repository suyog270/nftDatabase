const mongoose = require("mongoose")

const uriSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    }
})