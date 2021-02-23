const userInfo = require('../Schemas/userSchema');

module.exports ={

  // function to check if user exists
  addUser:async function(data){
    const checkEmail = await userInfo.findOne({'email': data.email})
    const checkUsername = await userInfo.findOne({'username': data.username})
    if(checkEmail){
      return ("Email already exists");
    } else if(checkUsername){
      return ("Username already exists");
    } else{
      userInfo.create(data);
      return ("Details entered");
    }
  },

  // function to check the login credentials
  checkUser:async function(data){
    const checkUserCredentials = await userInfo.findOne({"email":data.email,"password":data.password});
    if(checkUserCredentials){
      return ("Login Successful");
    } else{
        const checkUserExists = await userInfo.findOne({"email":data.email});
        if(checkUserExists){
            return ("Please enter the correct password.");
        } else{
            return ("Email is not registered.");
        }
    }
  },

  // function to get the user information
  getUserName:async function(data){
    return userInfo.findOne({'email':data}).then(res=>{return res;})
  },

  // function to change the password of the user
  updatePassword:async function(data){
    return userInfo.updateOne({'email':data.email},{$set:{password:data.password}});
  }
}
