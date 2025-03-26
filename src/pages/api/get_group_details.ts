import initMiddleware from "@/app/lib/init-middleware";
import Group from "@/model/Group";
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
            const group=await Group.findOne({
                _id:id
            })


            return res.status(200).json(group)
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }
    }
}