import initMiddleware from "@/app/lib/init-middleware";
import Group from "@/model/Group";
import GroupExpense from "@/model/GroupExpense";
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
            const id=req.query.id;
            const expense=await GroupExpense.find({
                group:id
            })
            const expenseWithDetails=await Promise.all(
                expense.map(async (expense)=>{
                    const user=await User.findOne({
                        _id:expense.holder
                    })
                    return {
                        title:expense.title,
                        amount:expense.amount,
                        holder:user.name,
                        date:expense.date
                    }
                })
            )
            return res.status(200).json(expenseWithDetails)
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }
    }
}