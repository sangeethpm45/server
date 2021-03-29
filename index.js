const express=require('express');
const session=require('express-session');
const dataservice=require('./services/data.service');
const app=express();
app.use(session({
    secret:"randomstring",
    resave:false,
    saveUninitialized:false
}))
app.use(express.json())
app.get('/',(a,b)=>{
    b.send("GET")
})
app.post('/register',(req,res)=>{
    const result=dataservice.register(req.body.acno,req.body.username,req.body.password)
    console.log(res.status(result.statusCode).json(result));
})

app.post('/login',(req,res)=>{
    console.log(req.body.currentUser);
    const result=dataservice.login(req,req.body.accn,req.body.passw)
    console.log(res.status(result.statusCode).json(result));
})

app.post('/deposit',(req,res)=>{
    const result=dataservice.deposit(req,req.body.accn,req.body.pwd,req.body.amt)
    console.log(res.status(result.statusCode).json(result));
})

app.post('/withdraw',(req,res)=>{
    const result=dataservice.withdraw(req,req.body.accn,req.body.pwd,req.body.amt)
    console.log(res.status(result.statusCode).json(result));
})

app.delete('/',(req,res)=>{
    res.send("delete")
})
app.put('/',(req,res)=>{
    res.send("put")
})

app.listen(3000,()=>
{
    console.log("listening...");
})
