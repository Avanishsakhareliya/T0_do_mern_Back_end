const mongoose = require("mongoose");
const struct = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    useref_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'To_do' 
    }
})
const result2 = mongoose.model("user_data_todo", struct);

module.exports = result2;
