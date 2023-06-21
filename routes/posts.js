const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post.js")
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const authMiddleware = require("../middlewares/auth-middleware");


// 게시글 전체 불러오기
router.get("/posts", async (req, res) => {
    const allPosts = await Posts.find().sort({ createdAt: -1 })
    if (!allPosts.length) {
        return res.status(200).json({
            "message": "작성된 게시글이 없습니다. 첫 작성자가 되어 주세요!"
        })
    } else {
        return res.status(200).json({ allPosts })

    }

})

// 게시글 1개 불러오기
router.get("/posts/:postid", async (req, res) => {
    const { postid } = req.params
    const selectPost = await Posts.find({ "_id": postid })
    if (!ObjectId.isValid(postid) || !selectPost) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    else if (selectPost) {
        return res.status(200).json({ selectPost })
    }
})


// 게시글 작성하기 
router.post("/posts", authMiddleware, async (req, res) => {
    const { nickname } = res.locals
    const { password } = res.locals
    const { title, content } = req.body

    if (nickname && password && title && content) {

        await Posts.create({ nickname, password, title, content })
        return res.status(201).json({ "message": "게시글이 작성되었습니다." })

    } else {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
})

// 게시글 수정하기
router.patch("/posts/:postid", authMiddleware, async (req, res) => {
    var { postid } = req.params
    const { nickname } = res.locals
    const { password } = res.locals
    var { title, content } = req.body
    const existPost = await Posts.findOne({ "_id": postid, "nickname": nickname, "password": password }).select("+password")

    if (!existPost || !ObjectId.isValid(postid) || password !== existPost.password) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    else if (password == existPost.password) {
        await Posts.findByIdAndUpdate(postid, { title, content })
        return res.status(200).json({
            "message": "게시글이 수정되었습니다."
        })
    }
})

// 게시글 삭제하기
router.delete("/posts/:postid", authMiddleware, async (req, res) => {
    var { postid } = req.params
    const { nickname } = res.locals
    const { password } = res.locals
    const existPost = await Posts.findOne({ "_id": postid, nickname, password }).select("+password")

    if (!existPost || !ObjectId.isValid(postid) || password !== existPost.password) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    else if (password == existPost.password) {
        await Posts.findByIdAndDelete({ "_id": postid })
        return res.status(200).json({
            "message": "게시글이 삭제되었습니다."
        })
    }
})

module.exports = router;