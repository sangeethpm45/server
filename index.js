const express=require('express');
const dataservice=require('./services/data.service');
const app=express();
app.use(express.json())
app.get('/',(a,b)=>{
    b.send("GET")
})
app.post('/register',(req,res)=>{
    const result=dataservice.register(req.body.acno,req.body.username,req.body.password)
    console.log(res.send(result.message));
})

app.post('/login',(req,res)=>{
    const result=dataservice.login(req.body.accn,req.body.passw)
    console.log(res.send(result.message));
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
