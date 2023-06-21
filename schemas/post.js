const mongoose = require("mongoose")

const postScheama = new mongoose.Schema({

    title: {
        type: String,

    },
    content: {
        type: String,
    },
    nickname: {
        type: String,

    },
    password: {
        type: String,
        select: false
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
)


module.exports = mongoose.model("Posts", postScheama)