const express = require("express")
const router = express.Router()
const users = require("../schemas/user")
const JWT = require("jsonwebtoken")

// cookieParser
const cookieParser = require('cookie-parser')
router.use(cookieParser())

// 정규식
const idcheck = /\W/;

// 회원 가입
router.post('/signup', async (req, res) => {
    const { nickname, password, confirm } = req.body
    const target = await users.findOne({ nickname })

    if (target) {
        return res.status(400).json({ message: "중복된 닉네임이 존재합니다." });
    } else if (idcheck.test(nickname) || nickname.length < 3) {
        return res.status(400).json({ message: "닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성해 주세요." });

    } else if (password.length < 4 || password.includes(nickname)) {
        return res.status(400).json({ message: "비밀번호는 최소 4자 이상, 닉네임과 같은 값이 포함될 수 없습니다." });

    } else if (password !== confirm) {
        return res.status(400).json({ message: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });

    } else if (password === confirm) {
        await users.create({ nickname, password })
        return res.status(201)
            .json({ message: "계정이 생성되었습니다. " })
    }
})

// 로그인
router.post('/login', async (req, res) => {
    const { nickname, password } = req.body
    const target = await users.findOne({ nickname })
    if (!target || target.password !== password) {
        return res.status(400).json({ message: "닉네임 또는 패스워드를 확인해주세요." })
    } else if (target.password == password) {
        const token = JWT.sign({ nickname, password }, "dayoung", { expiresIn: 3600 })
        let expires = new Date();
        expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.
        res.cookie("Authorization", `Bearer ${token}`, {
            expires: expires
        });
        return res.status(200).json({ message: "로그인에 성공하였습니다."}).end()
    }
})


module.exports = router