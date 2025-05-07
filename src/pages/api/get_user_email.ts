import { NextApiRequest,NextApiResponse } from "next";
import initMiddleware from "@/app/lib/init-middleware";
import User from "@/model/User";
import Cors from "cors"
const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET"]
    })
)
export default async function handler (req:NextApiRequest,res:NextApiResponse)
{
    await cors(req,res)
    if(req.method=="GET")
    {
        try{

            const email=req.query.email;
            if(!email)
            {
                return res.status(404).json({message:"Email not send by user"})
            }
            const user=await User.findOne({
                email
            })
            if(!user)
            {
                return res.status(404).json({message:"User not found"})
            }
            console.log(user)
            return res.status(200).json(user)
        }catch(error)
        {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}