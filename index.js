const express = require('express');
const session = require('express-session');
const dataservice = require('./services/data.service');
const cors=require('cors');

const app = express();
app.use(cors({
origin:"http://localhost:4200",
credentials:true
}))
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
    dataservice.register(req.body.accno, req.body.name, req.body.password).
        then(result => { res.status(result.statusCode).json(result) })

});



app.post('/login', (req, res) => {
    //console.log(req.body.currentUser);
    dataservice.login(req, req.body.accn, req.body.password).
        then(result => { res.status(result.statusCode).json(result) })

})

app.post('/deposit', Authenticate, (req, res) => {
    dataservice.deposit(req.body.accn, req.body.pwd, req.body.amt).
    then(result => { res.status(result.statusCode).json(result) })
})

app.post('/withdraw', Authenticate, (req, res) => {
    dataservice.withdraw(req,req.body.accn, req.body.pwd, req.body.amt)
    .then(result=>{res.status(result.statusCode).json(result)});
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
