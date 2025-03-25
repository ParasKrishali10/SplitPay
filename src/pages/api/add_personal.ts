import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import Personal from "@/model/Personal";
import User from "@/model/User";
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

        try{
            const {email,title,amount,date,notes}=req.body;
            const user=await User.findOne({
                email
            })
            const PE=await Personal.create({
                holder:user._id,
                title,
                amount,
                date,
                notes
            })
            return res.status(200).json({message:"Personal Expense Created Successfully"})
            }
        catch(error)
        {

            return res.status(500).json({message:"Internal Server Error",error})
        }

    }
    if(req.method=="GET")
    {

        try{
            const email=req.query.email;
            const user=await User.findOne({
                email
            })
            const expense=await Personal.find({
                holder:user._id
            })

            return res.status(200).json(expense)
            }
        catch(error)
        {
            return res.status(500).json({message:"Internal Server Error",error})
        }

    }
    if(req.method=="PUT")
    {
        try{

            	const {id}=req.body;
                if (!id) {
                    return res.status(400).json({ error: "Expense ID is required" });
                }
                const deletedExpense = await Personal.findByIdAndDelete(id);
                if (!deletedExpense) {
                    return res.status(404).json({ error: "Expense not found" });
                }

                return res.status(200).json({ message: "Expense deleted successfully" });
        }catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}