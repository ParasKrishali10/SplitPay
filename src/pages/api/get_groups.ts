import initMiddleware from "@/app/lib/init-middleware";
import Group from "@/model/Group";
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
    if(req.method=="GET")
    {
        try{
            const email=req.query.email
            const curr_user=await User.findOne({
                email
            })
            const group=await Group.find({
                $or:[
                    {"members.user":curr_user._id},
                    {admin:curr_user._id}
                ]
            })
            return res.status(200).json(group)
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }
    }
}