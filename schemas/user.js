const mongoose = require("mongoose")

const userScheama = new mongoose.Schema({
    nickname: {
        type: String,

    },
    password: {
        type: String,


    },
    confirm: {
        type: String,


    }

},
    {
        versionKey: false,
    }
)


module.exports = mongoose.model("users", userScheama)