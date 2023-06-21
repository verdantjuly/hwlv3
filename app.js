const express = require('express');
const connect = require('./schemas');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');

const app = express();
const port = 3000;

connect();

app.use(express.json())
app.use("/api", [userRouter,postRouter,commentRouter])

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다!")
})
