const db = require('../config/db')
const validator = require('validator')
const bcrypt = require('bcrypt')
class Signup {
    constructor (){
        
    }


    async signupResDetails(details){
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

        const sql = `INSERT INTO restaurateur 
        (username, ownername, email, contact, password) VALUES
        ('${details.username}',
        '${details.ownername}',
        '${details.email}',
        '${details.contact}',
        '${hash}')`;

        const res2 = await db.execute(sql).then((data)=>{
            console.log(data[0]);
            return data
        })
        .catch((err)=>{
            console.log(err.message)
            return err
       })

       const restaurateur = 'Restaurateur'
       const sql2 = `INSERT INTO users 
        (username, email, password, role) VALUES
        ('${details.username}',
        '${details.email}',
        '${hash}',
        '${restaurateur}')`;

        const res3 = await db.execute(sql2).then((data)=>{
            console.log(data[0]);
            return data
        })
        .catch((err)=>{
            console.log(err.message)
            return err
       })

        

    }
    

    // async signinDetails(details){
    //     console.log(details.username,details.email,details.password)
    //     if (!details.email||!details.password) throw Error ('Email and Password Fields are required!')
    //     if(!validator.isEmail(details.email)) throw Error ('Email is not valid!');

    //     const query = `SELECT * FROM user where user.email='${details.email}'`
    //     const res = await db.execute(query)
    //     console.log(res)

    //     if (res[0].length===0) throw Error('Invalied Email!');

    //     console.log(res[0][0].password)
        
    //     const match = await bcrypt.compare(details.password, res[0][0].password);
    //     if (!match) {
    //         throw new Error('Invalid password');
    //     }
    //     if (match) {
    //         console.log(true)
    //         return res[0][0].role
    //     }
    
        
        


        
        
    // }
   
}
// class CustomerData {
//     constructor(username, email, role) {
//             this.username = username,
//             this.email = email,
//             this.role = role
//     }


//     async customerDetails() {

//         const query = `SELECT id, username, email, contact, address, province, district, city FROM customer`
//         const res = await db.execute(query).then(data => data[0])
       
//         .catch(err => err)

//         console.log(res);
//         return res

//     }


// }

module.exports = {Signup}