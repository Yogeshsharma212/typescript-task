import md5 from 'md5';
import jwt from 'jsonwebtoken'
import User from '../models/user';
import express from 'express';
async function signup(req:any, res:any, next:any)
{
    const user = await checkexist(req.body.email);
    // console.log(user);
    if(!user){
        insert(req.body);
        console.log(await jwtcreation(req.body.name, req.body.password));
        res.status(200).json({
            msg:"signup successfully"
        })
        res.end()
    }else{
        res.send("User already exists");
    }
    
}
//check exist function
async function checkexist(email:any){
const user = await User.findOne({email:email})
return user;
}

async function encryption(pass:any){

    return md5(pass);
} 



async function insert(user : any) {
    const data =  new User({
        id:user.id,
        name:user.name,
        password:await encryption(user.password),
        phn:user.phn,
        address:user.address,
        email:user.email
})       
await data.save()
}


async function jwtcreation(name: any, password: any) 
{
    const token= await jwt.sign({
        name:name,
        password:password,
    },'this is dummy text',{
        expiresIn:"1h"
    }
    );
    return token;
}

    
export default signup;



