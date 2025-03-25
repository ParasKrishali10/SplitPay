import User from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import Group from "@/model/Group";
import Account from "@/model/Account";
import GroupShare from "@/model/GroupShare";
import mongoose from "mongoose";
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

            const {spliting_individual_email,participants,amount,id}=req.body;
            const split_user=await User.findOne({
                email:spliting_individual_email
            })
            const admin_amount=amount-Math.floor((amount/(participants.length-1)))
            const user_amount=Math.floor((amount/participants.length))
            const update_split_user=await Account.updateOne(
                {userId:split_user._id},
                {$inc:{profit:admin_amount}}
            )
           const user= await GroupShare.updateOne(
                {
                    group:id,
                    'members.user': split_user._id
                },
                { $inc: { 'members.$.profit': admin_amount } },
                {new:true}
            );
            for(const participant of participants)
            {
                const participantUser=participant._id
                if (participantUser.toString() === split_user._id.toString()) {
                    continue;
                }
                await Account.updateOne(
                    {userId:participantUser},
                    {$inc:{loss:user_amount}}
                )
                await GroupShare.updateOne(
                    {
                        group:id,
                        'members.user': participantUser
                    },
                    { $inc: { 'members.$.loss': user_amount } },
                    {new:true}
                );
            }
            console.log('Balance upated')
           return  res.status(200).json({ message: "Balances updated successfully" });
        }catch(error)
        {
            console.error("Error while updating balances",error)
            return res.status(500).json({message:"Internal Server Error"})
        }
    }
    if(req.method=="GET")
    {
        const user_details = req.headers["user-details"];
        const id = req.headers["group-id"];
        if(!user_details || !id)
        {
            return res.status(400).json("No data recieved form frontend")
        }
        const groupShare=await GroupShare.findOne({
            group:id
        })
        const user_info=await groupShare.members.find(
            (member:any)=>member.user.toString()===user_details.toString()
        )

        if(!user_info)
            {
                return res.status(400).json("No data found in group share ")
            }

            return res.status(200).json({
                profit: user_info.profit,
                loss: user_info.loss
            });

    }
}