
const express = require("express")
const router = express.Router()
const { Users } = require("../models");
const JWT = require("jsonwebtoken")

// cookieParser
const cookieParser = require('cookie-parser')
router.use(cookieParser())

// bodyParser
const bodyParser= require('body-parser')
router.use(bodyParser.urlencoded({extended: true})) 

// 정규식
const idcheck = /^(?=.*[\da-zA-Z])[0-9a-zA-Z]{3,}$/;

// 회원 가입
router.post('/signup', async (req, res) => {
    const { nickname, password, confirm } = req.body
    const target = await Users.findOne({ where: { nickname } })

    if (target) {
        return res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'}).write( "<script>alert('중복된 닉네임이 존재합니다.')</script>" ).end()
    } else if (!idcheck.test(nickname)) {
        return res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'}).write( "<script>alert('닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성해 주세요')</script>" ).end()

    } else if (password.length < 4 || password.includes(nickname)) {
        return res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'}).write( "<script>alert('비밀번호는 최소 4자 이상, 닉네임과 같은 값이 포함될 수 없습니다.')</script>" ).end()


    } else if (password !== confirm) {
        return res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'}).write( "<script>alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')</script>" ).end()



    } else if (password === confirm) {
        await Users.create({ nickname, password })
        return res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}).write( "<script>alert('계정이 생성되었습니다.')</script>" ).end()
    }
})

// 로그인
router.post('/login', async (req, res) => {
    const { nickname, password } = req.body
    const target = await Users.findOne({ nickname })
    if (!target || target.password !== password) {
        return res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'}).write( "<script>alert('닉네임 또는 패스워드를 확인해 주세요.')</script>" ).end()
    } else if (target.password == password) {
        const token = JWT.sign({ nickname, password }, "dayoung", { expiresIn: 3600 })
        let expires = new Date();
        expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.
        res.cookie("authorization", `Bearer ${token}`, {
            expires: expires
        });
        return res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}).write( "<script>alert('로그인이 성공하였습니다.')</script>" ).end()

    }
})


module.exports = router