const signupModel = require('../models/signupModel')
const signupRes = new signupModel.Signup()

exports.signupResDetails= async (req,res)=>{
    signupRes.signupResDetails(req.body).then((data)=>{
        console.log(data);
        res.status(200).send('success')
    }).catch((err)=>{
        console.log(err)
        res.status(400).send(err.message)
      })


}


// exports.signinDetails = async (req, res) => {
//     try {
//         const role = await signup.signinDetails(req.body);
//         console.log(role);
//         res.status(200).json({ role });
//     } catch (err) {
//         console.error(err);
//         res.status(400).send(err.message);
//     }
// };


// const getCustomer = new signupModel.CustomerData()
// exports.customerDetails  = async (req,res)=>{
//     console.log(req.url)

//     getCustomer.customerDetails().then((data)=>{
//         console.log(data)
//         res.json(data);
//     });
    
// }

