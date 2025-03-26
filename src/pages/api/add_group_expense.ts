import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import User from "@/model/User";
import GroupExpense from "@/model/GroupExpense";

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
        const {holderemail,title,amount,date,group}=req.body
        const user=await User.findOne({
            email:holderemail
        })

        try{
            await GroupExpense.create({
                holder:user._id,
                title,
                amount,
                date,
                group
            })
            return res.status(200).json({message:"Group Created Successfully"})
        }catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }

    }
}