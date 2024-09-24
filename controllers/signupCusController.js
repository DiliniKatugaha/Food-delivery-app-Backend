const signupCusModel = require('../models/signupCusModel')
const signupCus = new signupCusModel.Signup()

exports.signupCusDetails= async (req,res)=>{
    signupCus.signupCusDetails(req.body).then((data)=>{
        console.log(data);
        res.status(200).send('success')
    }).catch((err)=>{
        console.log(err)
        res.status(400).send(err.message)
      })


}


