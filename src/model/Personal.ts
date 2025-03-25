import mongoose from "mongoose";
import { Schema } from "zod";
const PersonalSchema=new mongoose.Schema({
     holder:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        title:{
            type:String,
            require:true,
            trim:true
        },
        amount:{
            type:Number,
            required:true,
            default:0
        },
        date:{
            type:String,
            default:Date.now
        },
        notes:{
            type:String,
            default:"No Note Mentioned"
        }
})
const Personal=mongoose.models.Personal || mongoose.model("Personal",PersonalSchema)
export default Personal