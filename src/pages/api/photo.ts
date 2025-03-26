import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";;
const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET"]
    })
)
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{

    await cors(req,res)
    if(req.method=='GET')
    {

        try{

            const email=req.query.email
            if(!email)
            {
                return res.status(400).json({message:"Unauthorized acesss"})
            }
            const user=await User.findOne({
            email
            })
            if (!user) {
                return res.status(404).json({ message: "User not found" });
              }


            return res.status(200).json({
                image:user.image
            })
        }catch(error)
        {
            console.error("Error while updating user image",error)
            return res.status(500).json({message:"Internal Server Error"})
        }
    }
}