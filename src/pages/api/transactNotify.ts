import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import User from "@/model/User";
import TransactNotify from "@/model/TransactNotify";
const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET"]
    })
)
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    await cors(req,res)
    if(req.method==="POST")
    {
        try{

            const {sender_email,participants,message,tag}=req.body
                const sending_person=await User.findOne({
                    email:sender_email
                })
                const reciever_person=await User.findOne({
                    _id:participants
                })

                await TransactNotify.create({
                    sender:sending_person._id,
                    reciever:reciever_person,
                    message,
                    tag
                })
                return res.status(200).json({message:"Notification sent Successfully"})
        }
        catch(error)
        {
            console.error("Error while sending notification",error)
            return res.status(500).json({message:"Internal Server Error"})
        }
    }
    if(req.method=="GET")
        {
            try{

                const email=req.query.email
                const user=await User.findOne({
                    email
                })
                const notifications=await TransactNotify.find({
                    reciever:user._id
                })
                return res.status(200).json(notifications)
            }catch(error)
            {
                return res.status(500).json({message:"Internal Server Error",error})
            }

        }
}