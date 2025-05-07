import initMiddleware from "@/app/lib/init-middleware";
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
            const id=req.query.id;
            const user=await User.findOne({
                _id:id
            })
            if(!user)
            {
                return res.status(404).json({ message: "User not found", success: false });
            }
            return res.status(200).json(user)
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }
    }
}