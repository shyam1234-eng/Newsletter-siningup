const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_adress: email,
        status: "subscribed",
        merger_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/f0a9bd16cd";
  const options = {
    mehtod: "post",
    auth: "shyam1:5d8a6baec9d98320f5dbb3b044c18147-us14"
  }

  const request = https.request(url, options, function (response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function (req, res) {
  res.redirect("/")
});





app.listen(4000, function () {
  console.log("server is running on port 4000...")
});

// API KEY
// b48170cc7f21af3de4ca9b372ded1ccf-us14

// LIST ID
// f0a9bd16cd