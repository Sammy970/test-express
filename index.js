const express = require('express')
var session = require('express-session')
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/pdf', limit: '10mb' }));
app.use(bodyParser.json());
app.set('trust proxy', 1) // trust first proxy

// Use the session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
}))
// Access the session as req.session
app.get('/', function (req, res, next) {
    res.send('<form action="/login" method="post">' +
        'Username: <input name="user"><br>' +
        'Password: <input name="pass" type="password"><br>' +
        '<input type="submit" text="Login"></form>')
})

app.post('/login', function (req, res, next) {
    req.session.user = {
        "data1": req.body.user,
        "data2": req.body.pass

    }
    console.log(req.session.user)
    res.write('<p>username for session:' + req.session.user.data1 + '</p>')
    res.end('<p>password for session:' + req.session.user.data2 + '</p>')

})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));