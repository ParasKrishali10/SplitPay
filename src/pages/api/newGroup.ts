import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import Group from "@/model/Group";
import User from "@/model/User";
import GroupShare from "@/model/GroupShare";

const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET"]
    })
)
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{

    await cors(req,res)
    if(req.method=="POST")
    {
        try{

            const {name,description,participants,email}=req.body
            console.log(participants)
           const mappedParticipants=participants.map((p:any)=>({
            user:p._id
           }))
           console.log(mappedParticipants)
           const user=await User.findOne({
                email
           })
           mappedParticipants.push({user:user._id})
           const admin=user._id
            const group=await Group.create({
                name,
                description,
                admin,
                members:mappedParticipants,
                balance:0
            })
            await GroupShare.create({
                group:group._id,
                members:mappedParticipants
            })
            return res.status(200).json({message:"Group Created Successfully"})
        }catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }

    }
}