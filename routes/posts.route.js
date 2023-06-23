const express = require("express");
const { Posts } = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const cookieParser = require('cookie-parser')
router.use(cookieParser())
const { Op } = require("sequelize");




// 게시글 전체 불러오기
router.get("/posts", async (req, res) => {
    const allPosts = await Posts.findAll({ order: [["createdAt", "desc"]] , attributes: ["id", "title","content","nickname", "createdAt", "updatedAt"], })
    if (!allPosts.length) {
        return res.status(200).json({
            "message": "작성된 게시글이 없습니다. 첫 작성자가 되어 주세요!"
        })
    } else {
        return res.status(200).send(allPosts)

    }

})

// 게시글 1개 불러오기
router.get("/posts/:id", async (req, res) => {
    const { id } = req.body
    const selectPost = await Posts.findOne({  attributes: ["postId", "title", "createdAt", "updatedAt"]  , where: { id } })
    if (!selectPost) {
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

    console.log(title)
    
    if (nickname && password && title && content) {
        await Posts.create({ nickname, password, title, content })
        return res.status(201).json({ "message": "게시글이 작성되었습니다." })

    } else {
       
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
})

// 게시글 수정하기
router.patch("/posts/:id", authMiddleware, async (req, res) => {
    var { id } = req.params
    const { nickname } = res.locals
    const { password } = res.locals
    var { title, content } = req.body
    const existPost = await Posts.findOne({ where: { id } })

    if (!existPost || password !== existPost.password) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    else if (password == existPost.password) {
        await Posts.update({ title, content, id, password, nickname },{ where: {
            [Op.and]: [{ id }, [{ password }]],
     } })
        return res.status(200).json({
            "message": "게시글이 수정되었습니다."
        })
    }
})

// 게시글 삭제하기
router.delete("/posts/:id", authMiddleware, async (req, res) => {
    var { id } = req.params
    const { password } = res.locals
    const existPost = await Posts.findOne({ where: { id } })

    if (!existPost || password !== existPost.password) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    else if (password == existPost.password) {
        await Posts.destroy({ where: { id } })
        return res.status(200).json({
            "message": "게시글이 삭제되었습니다."
        })
    }
})

module.exports = router;