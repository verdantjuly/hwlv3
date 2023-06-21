const mongoose = require("mongoose")

const commentScheama = new mongoose.Schema({
    nickname: {
        type: String
    },

    password: {
        type: String,
        select: false,

    },

    content: {
        type: String
    },

    postid: {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("Comments", commentScheama)