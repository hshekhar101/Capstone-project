const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.listen(port, function() {
    console.log("The server is started on port : " + port);
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const email = req.body.email;
    const msg = req.body.message;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname,
                MESSAGE: msg
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/d74ef9ee26";
    const options = {
        method: "POST",
        auth: "himanshu:e280f657aff90bb140a23ca00221d847-us21"
    }
    const request = https.request(url, options, function(response) {
        const statusCode = response.statusCode;
        if (statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});