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
           const expense= await GroupExpense.create({
                holder:user._id,
                title,
                amount,
                date,
                group
            })
            console.log(expense)
            return res.status(200).json(expense)
        }catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }

    }
    if(req.method==="GET")
    {
        try{
            const id=req.query.id
            if(!id)
            {
                return res.status(400).json("Email is not sent")
            }
            const expense=await GroupExpense.findOne({
                _id:id
            })
            if(!expense){
                return res.status(401).json("No expense found")
            }
            return res.status(200).json(expense)
        }catch(error)
        {
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    }
}