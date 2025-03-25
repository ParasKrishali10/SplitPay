
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User";
import Account from "@/model/Account";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import { getSession } from "next-auth/react";

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

            const user= await User.findOne({
                email:req.query.email
            })
            return res.status(200).json(user.image);
        }
        catch(error)
        {
            console.log("Error fetching user",error)
        }
    }
}
