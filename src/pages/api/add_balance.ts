import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import Group from "@/model/Group";
import User from "@/model/User";
import GroupExpense from "@/model/GroupExpense";

const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET","PUT"]
    })
)
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{

    await cors(req,res)
    if(req.method=="PUT")
    {
        try{

            const {id,amount}=req.body
           const result= await Group.updateOne(
            {_id:id},
            {$inc:{balance:amount}}
           )
            res.status(200).json({ message: "Balance updated successfully"});
        }
   catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).json({ message: "Internal Server Error", error });
    }
    }
}