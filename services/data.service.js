const db = require('./db')

let currentUser;
//--------Register---------------------//
const register = (accno, name, password) => {
    return db.User.findOne({ accno }).then(result => {

        if (result) {


            return {
                status: false,
                statusCode: 422,
                message: "user exist please login"
            }
        }
        else {
            const newUser = new db.User({
                accno,
                name,
                balance: 0,
                password
            })
            newUser.save()
            return {
                status: true,
                statusCode: 200,
                message: "sucess"
            }
        }
    })
}

//--------------------------

//-------------Login---------------------------------//

const login = (req, accno, passw) => {
    accno = parseInt(accno)
    return db.User.findOne({ accno, password: passw }).then(result => {
        
        if (result) {
           
            req.session.currentUser=result.accno
            return {
                
                status: true,
                statusCode: 200,
                message: "Login Sucess",
                name:result.name,
                acno:result.accno
            }
        }
        else {
            return {
                status: false,
                statusCode: 422,
                message: "invalid"
            }
        }
    })
}
//--------------------------------------------//




//-------------Deposit-------------------------//
const deposit = (accn, pwd, amt) => {
    var amd = parseInt(amt)
    //this.getDetails()
    return db.User.findOne({accno:accn,password:pwd}).then(user=>{
        if(!user){
            return {
                status: false,
                statusCode: 422,
                message: "invalid"
            }
        }
        else{
            user.balance+=amd
            user.save()
            return {
                status: true,
                statusCode: 200,
                message: +amd+"credited successfully.\nbalance:" + user.balance
            }

        }
    })}
//---------------------------------------//



//---------Withdraw-------------------------------//

 const withdraw = (req,accn, pass, amt) => {
    var amd = parseInt(amt)
    
    return db.User.findOne({accno:accn,password:pass}).then(user=>{
        if(!user){
            return {
                status: false,
                statusCode: 422,
                message: "invalid"

            }
        }
        else{
            if(req.session.currentUser==accn){
                if(user.balance<amd){
                    return {
                        status: false,
                        statusCode: 422,
                        message: "insuffiecient balance"
    
                    }
                }
                else{
                    user.balance-=amd
                    user.save()
                    return {
                        status: true,
                        statusCode: 200,
                        message: +amd+" debited successfully.\nbalance :" + user.balance
                    }
                }
            }
            else{
                return {
                    status: false,
                    statusCode: 422,
                    message:"permission denied"
                }
            }
            
        }
    })
}
//-----------------------------------------------------------------




module.exports = {   
    register,
    login,
    deposit,
    withdraw
}