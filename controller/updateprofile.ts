import md5 from 'md5';
import jwt from 'jsonwebtoken'
import User from '../models/user';
import express from 'express';

export default async function updateprofile(req: any, res: any, next: any) {
   
    let { name, password, err } = jwtverification(req.headers.authorization);
    if (err) {
        res.send(err);
    } else {
        let pas = md5(String(password))
        
        const userr = await User.findOneAndUpdate({name,password:pas},req.body, { upsert: false })
        md5(req.body.password)
    if (userr) {
        await userr.save()
        res.send(" successfully updated");
    }
    else {
        res.send("User not found");
    }
}
}






//jwt verified function
function jwtverification(token: any) {
    let name, password, err;

    jwt.verify(token, "this is dummy text", (error: any, decodedToken: any) => {
        if (error) {
            err = error;
        }
        else {
            name = decodedToken.name;
            password = decodedToken.password;

        }
    })
    return { name, password, err };
}

function id(id: any, body: any) {
    throw new Error('Function not implemented.');
}
