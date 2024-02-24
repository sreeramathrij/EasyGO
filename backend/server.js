
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/user.js')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/EasyGO');

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ statur: 'error', error: 'Email is already taken' })
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    }, "")
    if(user){

        const token = jwt.sign({
            name: user.name,
            email: user.email,
        },
        "qzpmybtval10"
    )

        return res.json({ status: 'ok', user:token })
    } else {
        return res.json({ status: 'error', user:false })
    }
})

app.listen(1337, ()=> {
    console.log("Server started on 1337")
})