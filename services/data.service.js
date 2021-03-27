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

const register = (accno, name, password) => {
    if (accno in accountdetails) {

        return {
            status: false,
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
            message: "sucess"
        }
    }
}
const login=(accn, passw)=>{
    if (accn in accountdetails) {
        if (passw == accountdetails[accn]["password"]) {
            
            currentUser = accountdetails[accn]['name']

            //this.saveDetails()
            return {
                status:true,
                message:"Login Sucess"
            }

        } else {
            
            return {
                status:false,
                message:"inavlid"
            }
        }
    } else {
        
        return {
            status:false,
            message:"no user"
        }
    }
}


module.exports = {
    register,login
}