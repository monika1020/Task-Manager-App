const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());



const dbadduser = require("./db.add.user");


app.get("/a", (req, res) => {
    res.send("Welcome!!")
});





// http://localhost:3000/adduser
app.post("/adduser", async (req, res) => {
    try {
        const input = req.body;

        await dbadduser.addUser(input);
        res.json({ message: "success post" });
    } catch (err) {
        res.json({ message: "failure post" });
    }
});

app.post("/auth-user", async (req, res) => {
    try {
        const input = req.body;

        await dbadduser.authenticateUser(input);
        res.json({ opr: true });
    } catch (err) {
        res.json({ opr: false });
    }
});


/////
// http://localhost:3000/adduser
app.post("/addtask", async (req, res) => {
    try {
        const input = req.body;

        await dbadduser.addTask(input);
        res.json({ message: "success post" });
    } catch (err) {
        res.json({ message: "failure post" });
    }
});

///








app.listen(3000);