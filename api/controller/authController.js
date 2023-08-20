import db  from "../repository/db.js" 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register=(req,res)=>{
    //check exixsting user
    console.log("yes")
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q,[req.body.email , req.body.username],(err,data)=>{
        if(err){
            console.log(err)
        return res.json(err)}
        if(data.length) return res.status(409).json("user already exsist!");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const q = 'INSERT INTO users (`username`,`email`,`password`) VALUE (?)'

        const value = [
            req.body.username,
            req.body.email,
            hash
        ]
        
        db.query(q,[value],(err , data)=>{
            if(err) return res.status(400).json(err);
            return res.status(200).json("User created")
        })

    })
}
export const login=(req,res)=>{
    const q = 'SELECT * FROM users WHERE username =?'

    db.query(q,req.body.username,(err,data)=>{
        if(err)return res.status(400).json(err);
        if(data.length===0)return res.status(404).json("user not found");

        const checkedPass= bcrypt.compare(req.body.password,data[0].password)
        if(!checkedPass) return res.status(400).json("Incorrect Password or USername");

        const {password,...other} = data[0];

        const token = jwt.sign({id:data[0].id },"jwtKey")
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(data[0])

    })

}
export const logout=async(req,res)=>{
   
        res.clearCookie("access_token",{
            sameSite:"none",
            secure:true
        }).status(200).json("user Logout");
          
    
}
export const update=(req,res)=>{

}
export const deleteuser =(req,res)=>{

}