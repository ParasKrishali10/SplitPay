import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET","PUT"]
    })
)
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{

    await cors(req,res)
    if(req.method=='PUT')
    {
        try{

            const {name,email,mobile}=req.body;

            if(!email || !name || !mobile)
            {
                return res.status(400).json({message:"Unauthorized acesss"})
            }
           const user=await User.findOneAndUpdate(
            {email},
              {  name,
                email,
                mobile},
                {new:true}
            )
             if(!user)
                {
                    return res.status(400).json({message:"No user with this email exist"})
                }
            return res.status(200).json({message:"Profile Updated successfully "})
        }catch(error)
        {
            console.error("Error while updating user details")
            return res.status(500).json({message:"Internal Server Error"})
        }
    }
    if(req.method=='POST')
    {
        try{
            const bcrypt = require('bcrypt');
            const {email,newPassword,checkPassword,currentPassword}=req.body
            const check=await bcrypt.compare(currentPassword,checkPassword)
            if(!check)
            {
                return res.status(403).json({message:"Invalid Password"})
            }
            const hashedPassword=await bcrypt.hash(newPassword,10)
            const user=await User.findOneAndUpdate(
                {email},
                {password:hashedPassword},
                    {new:true}
                )
                if(!user)
                    {
                        return res.status(400).json({message:"No user with this email exist"})
                    }
                    return res.status(200).json({message:"Profile Updated successfully "})
                }catch(error)
                {
                    console.error("Error while updating user details",error)
                    return res.status(500).json({message:"Internal Server Error"})
                }
    }
}