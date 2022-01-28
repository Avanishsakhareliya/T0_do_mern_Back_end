require("./connect")
const userdata_todo = require("../Schema/TodoSchema")
const express = require("express")
var cors = require('cors')
const To_do = require("../Schema/schema")
const router = express()
router.use(cors())

router.use(express.json())

// router.get("/todo_note", async (req, res) => {
//     try {
//         const todo_user_note = await userdata_todo.find();
//         console.log(todo_user_note);
//         res.send(todo_user_note)
//     } catch (error) {
//         console.log(error);
//     }
// });

router.get("/todo_list", async (req, res) => {
    const { token } = req.headers;
    const finduser = await To_do.findOne({ token });
    console.log("token of header",finduser);
    const show = await userdata_todo.find({ useref_id: finduser._id })
    res.send(show);
})

router.post("/todo", async (req, res) => {
    try {
        const { token } = req.headers;
        const finduser = await To_do.findOne({ token });
        console.log("foind user", finduser);
        const { title, message } = req.body;
        const createuser_to_do = await userdata_todo.create({ title, message, useref_id: finduser._id })
        createuser_to_do.save()
        res.send(createuser_to_do)
    } catch (error) {
        console.log(error, "error ");
    }
});


router.delete("/deletedata/:id", async (req, res) => {
    const removedata = await userdata_todo.findByIdAndRemove(req.params.id)
    console.log(removedata);
    res.send(removedata)
})

router.put("/updatedata/:id", async (req, res) => {
    const updatedata = await userdata_todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedata)
})

router.listen(5000, () => {
    console.log("todo port done");
})