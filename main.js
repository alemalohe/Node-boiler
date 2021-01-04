var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
var multer = require("multer");
var nodeMailer = require("nodemailer");
var jwt = require("jsonwebtoken");
const PORT = 5000;

/* file srorage */
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
    },
  })
);

//cookie parser
app.use(cookieParser());
//body parser is used to parse data sent from the client
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//enables the public diretory to be public
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get('/', function(req,res){
    res.render('index')
})

app.listen(PORT, function(req,res){
    console.log('Localhost ' + String(PORT))
})
