const express = require("express");
// require("./Connect/connect")
const To_do = require("./Schema/schema");
const jwt = require("jsonwebtoken")
var cors = require('cors')
const bcrypt = require('bcrypt');
// require("./Connect/Todo")


const router = express();
router.use(express.json())
router.use(cors())
require("./Connect/Todo");
require("./Connect/connect");

const TOKEN_KEY = "avanishsakhreliyaashvinbhai";
router.get("/", (req, res) => {
    res.send("hello")
})

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, c_password } = req.body
        // console.log("email", email);
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(validRegex)) {
            console.log("Valid email address!");

            let user_email = await To_do.findOne({ email });

            if (user_email) {
                return res.status(400).json({ massage: 'User with the provided email already exist.' });
            }
            else {

                if (password === c_password) {
                    const saltRounds = 10;
                    const pass = await bcrypt.hash(password, saltRounds);
                    const c_pass = await bcrypt.hash(c_password, saltRounds);
                    var tokens = jwt.sign({ email }, TOKEN_KEY, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    // res.setHeader("token", tokens)
                    const userdata = await To_do.create({
                        username, email, password: pass, c_password: c_pass, token: tokens
                    })
                    userdata.save();
                    res.send(userdata)
                } else {
                    console.log("pass not matcdh");
                }
            }
        }
        else {
            console.log("Invalid email address!");
            return res.status(400).send({ massage: 'invalid email address ! please enter valid.' });
        }

    }
    catch (err
    ) {
        console.log(err)
    }
})
router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body
        const finduser = await To_do.findOne({ email });
        console.log("finduser", finduser);
        if (finduser) {
            const comper = await bcrypt.compare(password, finduser.password);
            var tokens = jwt.sign({ email }, TOKEN_KEY, {
                expiresIn: 86400 // expires in 24 hours
            });
            finduser.token = tokens

            await finduser.save();
            if (comper) {
                res.json({ massage: "successfull login", token: finduser.token })
            } else {
                res.json({ massage: "invalid data" })
            }
        }
        else {
            res.json({ massage: "invalid user" })
        }
    }
    catch (err) {
        console.log(err)
    }
})



router.listen(4000, () => {
    console.log("port is listing");
})