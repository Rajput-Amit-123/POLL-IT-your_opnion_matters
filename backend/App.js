var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
var User = require("./models/User");
const path = require('path');
var app = express();

const StaticPath = path.join(__dirname, '../forntend');
const StaticPathCss = path.join(__dirname, '../forntend/css');
console.log(StaticPath);
app.use(express.static(StaticPath));
app.use(express.static(StaticPathCss));
app.use(express.json());
// set our application port
app.set("port", 4000);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
    session({
        key: "user_sid",
        secret: "somerandonstuffs",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
        },
    })
);

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie("user_sid");
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect("/dashboard");
    } else {
        next();
    }
};

// route for Home-Page
app.get("/", sessionChecker, (req, res) => {
    sessionChecker();
    res.redirect("/login");
});

// route for user signup
app
    .route("/signup")
    .get(sessionChecker, (req, res) => {
        res.sendFile(path.join(StaticPath, '/html/signIn.html'));
    })
    .post((req, res) => {

        let myuser = new User({
            UserName: req.body.UserName,
            Email: req.body.Email,
            password: req.body.password,
        });
        // console.log(myuser);
        myuser.save((err, docs) => {
            if (err) {
                // console.log(err);
                res.redirect("/signup");
                }
        
             else {
                // console.log(docs)
                req.session.user = docs;
                res.redirect("/dashboard");
            }
        });
    });

// route for user Login
app
    .route("/login")
    .get(sessionChecker, (req, res) => {
        res.sendFile(path.join(StaticPath, '/html/logIn.html'));
    })
    .post(async (req, res) => {
        let username = req.body.UserName;
            password = req.body.password;

        try {
            let user = await User.findOne({ username: username }).exec();
            if (!user) {
                // console.log(user);
                res.redirect("/login");
            }
            user.comparePassword(password, (error, match) => {
                if (!match) {
                    res.redirect("/login");
                }
            });
            req.session.user = user;
            res.redirect("/dashboard");
        } catch (error) {
            // console.log(error)
        }
    });

// route for user's dashboard
app.get("/dashboard", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(path.join(StaticPath, './html/index.html'));
    } else {
        res.redirect("/login");
    }
});

app.get('/help',(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(path.join(StaticPath, './html/help.html'));
    } else {
        res.redirect("/login");
    }
})
app.get('/faq',(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(path.join(StaticPath, './html/faq.html'));
    } else {
        res.redirect("/login");
    }
})
app.get('/CreatePoll',(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(path.join(StaticPath, './html/CreatePoll.html'));
    } else {
        res.redirect("/login");
    }
})
app.get('/ViewPoll',(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(path.join(StaticPath, './html/otherPoll.html'));
    } else {
        res.redirect("/login");
    }
})
app.get('/Contect',(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(path.join(StaticPath, './html/contect.html'));
    } else {
        res.redirect("/login");
    }
})
app.get('/ThankYou',(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(path.join(StaticPath, './html/thank_U.html'));
    } else {
        res.redirect("/login");
    }
})

// route for user logout
app.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid");
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

// start the express server
app.listen(app.get("port"), () =>
    console.log(`App started on port http://localhost:${app.get("port")}/dashboard`)
);