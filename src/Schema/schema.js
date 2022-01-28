const mongoose = require("mongoose");
const validator = require("validator")

const struct = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
    },
    c_password: {
        type: String
    },
    token:String
})


const result = mongoose.model("To_do", struct);

module.exports = result;
