import User from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import Group from "@/model/Group";
const cors=initMiddleware(
    Cors({
        origin:"*",
        methods:["POST","GET","PUT"]
    })
)
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{

    await cors(req,res)
    if(req.method=='PUT')
    {

        try{
            const {group_id,user_email}=req.body
            const user=await User.findOne({
                email:user_email
            })
            const group=await Group.findById({
                _id:group_id
            })
            if(group.admin.toString()===user._id.toString()){
                await Group.findByIdAndUpdate(
                    group_id,
                        {$unset:{admin:""}},
                        {new:true}

                )
            }
            const updatedGroup = await Group.findByIdAndUpdate(
                group_id,
                { $pull: { members: { user: user._id } } },
                { new: true }
              );
              if(!updatedGroup){
                return res.status(404).json({message:"Group not found"})
              }
              return res.status(200).json({message:"User removed from group"})
        }catch(error)
        {
            console.error("Error while updating user image",error)
            return res.status(500).json({message:"Internal Server Error"})
        }
    }
}