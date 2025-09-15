import { NextResponse, userAgentFromString } from "next/server";
import Users from "../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user register
export const register = async (req)=>{
  const {email, name, password} =await req.json()
  try {
    let user = await Users.findOne({email});
  if(user)
    return NextResponse.json({message:"user already exist!", success:false});
  const hashpassword = await bcrypt.hash(password, 10)

    user = await Users.create({email, name, password:hashpassword});
    return NextResponse.json({
        message:"Registration successfully...",
        user,
        success:true
    })
    
  } catch (error) {
    return NextResponse.json({
        message:"Server error",
        error: error.message
    });
  }
  
};

// user login

export const login = async (req)=>{
    const {email, password} = await req.json();
    try {
        let user = await Users.findOne({email});
        if(!user)
            return NextResponse.json({
                message:"User Dosn't exist..!",
                success:false
            });
        const valid_password = await bcrypt.compare(password, user.password);
        if(!valid_password)
            return NextResponse.json({
                message:"Email or Password wrong..!",
                success:false
            });

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn:'1d'
        })    
        return NextResponse.json({
            message: `Welcome back ${user.name}`,user,token,
            success:true
        }) ;      

    } catch (error) {
        return NextResponse.json({
            message:"server error..!",
            error:error.message
        });
    }

};
