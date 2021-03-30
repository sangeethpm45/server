const express = require('express');
const session = require('express-session');
const dataservice = require('./services/data.service');
const app = express();
app.use(session({
    secret: "randomstring",
    resave: false,
    saveUninitialized: false
}))

const Logmiddileware = (req, res, next) => {
    console.log(req.body);
    next()
}

const Authenticate = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.json({
            status: false,
            statusCode: 404,
            message: "please login"
        })

    }
    next()

}
app.use(Logmiddileware)
app.use(express.json())
app.get('/', (a, b) => {
    b.send("GET")
})
app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.accn, req.body.username, req.body.password)
    console.log(res.status(result.statusCode).json(result));
})

app.post('/login', (req, res) => {
    console.log(req.body.currentUser);
    const result = dataservice.login(req, req.body.accn, req.body.password)
    console.log(res.status(result.statusCode).json(result));
})

app.post('/deposit', Authenticate, (req, res) => {
    const result = dataservice.deposit(req.body.accn, req.body.pwd, req.body.amt)
    console.log(res.status(result.statusCode).json(result));
})

app.post('/withdraw', Authenticate, (req, res) => {
    const result = dataservice.withdraw(req.body.accn, req.body.pwd, req.body.amt)
    console.log(res.status(result.statusCode).json(result));
})

app.delete('/', (req, res) => {
    res.send("delete")
})
app.put('/', (req, res) => {
    res.send("put")
})

app.listen(3000, () => {
    console.log("listening...");
})
