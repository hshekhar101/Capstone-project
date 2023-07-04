const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.97c1rrt.mongodb.net/portfolio");

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB successfully");
    const formSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        message: String
    });

    const Form = mongoose.model("Form", formSchema);

    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/index.html");
    });

    app.post("/submit", function(req, res) {
        const fname = req.body.firstname;
        const lname = req.body.lastname;
        const email = req.body.email;
        const msg = req.body.message;
        const form = new Form({
            firstname: fname,
            lastname: lname,
            email: email,
            message: msg
        })
        form.save()
            .then(() => {
                res.sendFile(__dirname + "/success.html");

            })
            .catch((error) => {
                res.sendFile(__dirname + "/failure.html");

            });
    });

    app.post("/failure", function(req, res) {
        res.redirect("/");
    });

    app.listen(port, function() {
        console.log("The server is started on port : " + port);
    });
    mongoose.connection.on('error', (error) => {
        console.error("Error connecting to MongoDB:", error);

    });
});
