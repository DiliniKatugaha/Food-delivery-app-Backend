const db = require('../config/db')
const validator = require('validator')
const bcrypt = require('bcrypt')
class Signup {
    constructor (){
        
    }


    async signupCusDetails(details){
        console.log(details)
        if (!details.email||!details.password) throw Error ('Email and Password Fields are required!')
        if(!validator.isEmail(details.email)) throw Error ('Email is not valid!');
        if(!validator.isStrongPassword(details.password)) throw Error('password is not strong enough!');

        const query = `SELECT * FROM customer where customer.email='${details.email}'`
        const res = await db.execute(query)
        console.log(res)

        if (res[0].length===1) throw Error('Email already signedup!');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(details.password,salt);

        const sql = `INSERT INTO customer 
        (username, email, status, contact, hostel, address, password) VALUES
        ('${details.username}',
        '${details.email}',
        '${details.status}',
        '${details.contact}',
        '${details.hostel}',
        '${details.address}',
        '${hash}')`;

        const res2 = await db.execute(sql).then((data)=>{
            console.log(data[0]);
            return data
        })
        .catch((err)=>{
            console.log(err.message)
            return err
       })

       const customer = 'Customer'
       const sql2 = `INSERT INTO users 
        (username, email, password, role) VALUES
        ('${details.username}',
        '${details.email}',
        '${hash}',
        '${customer}')`;

        const res3 = await db.execute(sql2).then((data)=>{
            console.log(data[0]);
            return data
        })
        .catch((err)=>{
            console.log(err.message)
            return err
       })

        

    }
    

}
module.exports = {Signup}