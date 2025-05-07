import initMiddleware from "@/app/lib/init-middleware";
import ExpenseRecord from "@/model/ExpenseRecord";
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
    if(req.method==="POST")
    {
        try{
            const {user_email,expense,balance,members,id}=req.body
            if (!expense) {
                console.log("Expense not comed")
                return res.status(400).json({ message: "Missing expense ID" });
              }
            console.log(expense)
            const userData=await User.findOne({
                email:user_email
            })
            for(let i=0;i<members.length;i++)
            {
                if(members[i]._id.toString() !== userData._id.toString())
                {
                    await ExpenseRecord.create({
                        user:members[i]._id,
                        group:id,
                        expense,
                        message:`You owe Rs ${balance} to ${userData.name}`,
                        balance,
                        type:"owe"
                    })
                    await ExpenseRecord.create({
                        user:userData._id,
                        group:id,
                        expense,
                        message:`You own Rs ${balance} to ${members[i].name}`,
                        balance,
                        type:"own"
                    })
                }
            }
            return res.status(200).json("Expense History created")
        }catch(error)
        {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    }
    if(req.method==="GET")
    {
        try{
            const user_email=req.query.email
            const type=req.query.type
            const id=req.query.id
            console.log(user_email)
            console.log(type)
            console.log(id)
            if(!user_email || !type || !id)
            {
                return res.status(400).json("Parameters are not passed fully")
            }
            const userData=await User.findOne({
                email:user_email
            })
            const details=await ExpenseRecord.find({
                user:userData._id,
                type,
                group:id
            })
            return res.status(200).json(details)
        }catch(error)
        {
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    }
}