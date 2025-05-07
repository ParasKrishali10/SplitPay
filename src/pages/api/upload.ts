import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "@/app/lib/init-middleware";
import cloudinary from "@/app/lib/cloudinary";
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
        const {file}=req.body
        try{
            const uploadResponse=await cloudinary.uploader.upload(file,{
                folder:'uploads'
            })
            return res.status(200).json({url:uploadResponse.secure_url})
        }catch(error)
        {
            console.error('Cloudinary upload error',error)
            return res.status(500).json({error:'Uplaod Failed'})
        }
    }
}