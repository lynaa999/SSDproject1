const express=require("express");
//const mongoose= require("mongoose");
const collection =require("./model/users")
const collection1 =require("./model/posts")
const bcrypt = require('bcrypt');
const path = require("path");
const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/login");
// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

const app = express()
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password,
    }
     // Check if the username already exists in the database
     const existingUser = await collection.findOne({ name: data.name });

     if (existingUser) {
         res.send('User already exists. Please choose a different username.');}
         else{// Hash the password using bcrypt
            const saltRounds = 10; // Number of salt rounds for bcrypt
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    
            data.password = hashedPassword; // Replace the original password with the hashed one
    
            const userdata = await collection.insertMany(data);
            console.log(userdata);}
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch {
        res.send("wrong Details");
    }
});
app.get("/add-post", (req, res) => {
    res.send("newpost")});

//addpost
app.post('/add-post', async (req, res) => {
    
        const newpost = {
            title:"google",
            content: "leyla",
            author:req.body.author
        }
        const post = await collection1.insertMany(newpost);
            console.log(post)
            res.send(post)
    
  });












// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
