
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";


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

            const users= await User.find()
            return res.status(200).json(users);
        }
        catch(error)
        {
            console.error('Database Error:', error);
            throw new Error("Error fetching user")
        }
    }
}
