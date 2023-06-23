const express = require("express");
const postsRouter = require("./routes/posts.route");
const usersRouter = require("./routes/users.route");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', [postsRouter,usersRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})