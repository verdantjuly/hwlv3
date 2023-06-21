const mongoose = require("mongoose");
// mongoose version : 7.2.4

const connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/dayounghw")
        .catch(err => console.log(err))
}

mongoose.connection.on("error", err => {
    console.error("MongoDB 연결 에러", err)
})

module.exports = connect