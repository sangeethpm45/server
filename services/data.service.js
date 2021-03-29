let accountdetails = {
    1000: {
        accno: 1000,
        name: "userone",
        balance: 6000,
        password: "user1",
    },
    1001: {
        accno: 1001,
        name: "usertwo",
        balance: 9000,
        password: "user2",
    },
    1002: {
        accno: 1002,
        name: "userthree",
        balance: 6000,
        password: "user3",
    },
    1003: {
        accno: 1003,
        name: "userfour",
        balance: 9000,
        password: "user4",
    },
    1004: {
        accno: 1004,
        name: "userfive",
        balance: 6000,
        password: "user5",
    },
    1005: {
        accno: 1005,
        name: "usersix",
        balance: 9000,
        password: "user6",
    }
};
let currentUser;

const register = (accno, name, password) => {
    if (accno in accountdetails) {

        return {
            status: false,
            statusCode:422,
            message: "user exist please login"
        }

    }
    else {
        accountdetails[accno] = {
            accno,
            name,
            balance: 0,
            password
        }

        //   this.saveDetails()
        //   console.log(accountdetails);
        return {
            status: true,
            statusCode:200,
            message: "sucess"
        }
    }
}
//--------------------------
const login=(req,accn, passw)=>{
    if (accn in accountdetails) {
        if (passw == accountdetails[accn]["password"]) {
            
           req.session.currentUser = accountdetails[accn]['name']

            //this.saveDetails()
            return {
                status:true,
                statusCode:200,
                message:"Login Sucess"
            }

        } else {
            
            return {
                status:false,
                statusCode:422,
                message:"inavlid"
            }
        }
    } else {
        
        return {
            status:false,
            statusCode:422,
            message:"no user"
        }
    }
}


deposit=(req,accn,pwd,amt)=>{
    var amd=parseInt(amt)
    //this.getDetails()
    if(!req.session.currentUser){
        return{
            status:false,
            statusCode:404,
            message:"please login"
        }
    }
    if (accn in accountdetails) {
      var usr=accountdetails[accn]["name"]
      if (pwd ==accountdetails[accn]["password"]) {
          
        accountdetails[accn]['balance']+=amd
        return{
            status:true,
            statusCode:200,
            message:"amount credited successfully new balance"+accountdetails[accn]['balance']
        }  
          //this.saveDetails()
      } else {
          return{
              status:false,
              statusCode:422,
              message:"inavlid"
          }
          
          
      }
  } else {
      return{
          status:false,
          statusCode:422,
          message:"no user"
      }
      
  }
  }


  withdraw=(req,accn,pass,amt)=>{
    var amd=parseInt(amt)
    var usr=accountdetails[accn]["name"]
    //this.getDetails()
    if(!req.session.currentUser){
        return{
            status:false,
            statusCode:404,
            message:"please login"
        }
    }
    if (accn in accountdetails) {
      if (pass == accountdetails[accn]["password"]&&usr==currentUser) {
          if(amt>accountdetails[accn]["balance"]){
            return{
                status:false,
                statusCode:422,
                message:"insuffiecient balence"
            
        }
          }
          else{
            accountdetails[accn]['balance']-=amd
            return{
                status:true,
                statusCode:200,
                message:"amount credited successfully new balance :"+accountdetails[accn]['balance']
            }
           // this.saveDetails()  
          }
        
          
      } else {
          return{
              status:false,
              statusCode:422,
              message:"invalid"
          
      }}
  } else {
      return{
          status:false,
          statusCode:422,
          message:"no user"
      }
      
  }
  } 
module.exports = {
    register,
    login,
    deposit,
    withdraw

}