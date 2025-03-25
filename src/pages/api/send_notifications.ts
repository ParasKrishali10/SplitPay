
import { NextApiRequest, NextApiResponse } from "next";
import Notification from "@/model/Notification";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import User from "@/model/User";

const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET"]
    })
)
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{

    await cors(req,res)
    if(req.method=='POST')
    {

        try{
            const {sender_email,participants,message,tag}=req.body
            const sending_person=await User.findOne({
                email:sender_email
            })
            const mappedParticipants=participants.map((p:any)=>({
                user:p._id
               }))
            const notification=await Notification.create({
                sender:sending_person._id,
                reciever:mappedParticipants,
                message,
                tag
            })
            return res.status(200).json({message:"Notification sent Successfully"})
        }catch(error)
        {
            console.error("Error while sending notification")
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
            const notifications=await Notification.find({
                $or:[
                    {reciever:{$elemMatch:{user:user._id}}},
                    {sender:user._id}
                ]
            })

            return res.status(200).json(notifications)
        }catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }

    }
    if(req.method=="PUT")
    {
        try{
            const {id,check}=req.body;
            if(!id || !check)
            {
                return  res.status(400).json("Req parameter had not been passed")
            }
            console.log(id)
            console.log(check)
            const notify=await Notification.findOneAndUpdate({
                _id:id
            },{
                seen:check
            },
            {new:true}
        )
                return res.status(200).json(("Status updated succesfully"))

        }catch(error)
            {
                return res.status(500).json(error)
            }
        }
}