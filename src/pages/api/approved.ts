import initMiddleware from "@/app/lib/init-middleware";
import Transaction from "@/model/Transaction";
import User from "@/model/User";
import Cors from "cors"

import { NextApiRequest, NextApiResponse } from "next";
const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET"]
    })
)
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    await cors(req,res)
    if(req.method=="GET")
    {
        try{

            const email=req.query.email
            if(!email)
            {
                return res.status(404).json({ error: "Email parameter is missing", code: "EMAIL_NOT_PROVIDED" })
            }
            const user=await User.findOne({
                email
            })
            if(!user)
            {
                return res.status(404).json({ error: "User not found", code: "USER_NOT_FOUND" })
            }
            const details=await Transaction.find({
                reciever:user._id
            })
            return res.status(200).json(details)
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    }
    if(req.method=="PUT")
    {
        try{
            const {id,approval}=req.body
            console.log(id)
            console.log(approval)
            if(!id)
            {
                return res.status(404).json("Id not passed")
            }
            await Transaction.findOneAndUpdate({
                _id:id
            },{
                approved:approval
            },
            {new:true}
              )
              return res.status(200).json("Status update correctly")
        }catch(error)
        {
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    }
}