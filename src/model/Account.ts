import mongoose from "mongoose";
import { Schema,model,models } from "mongoose";
import User from "./User";
import exp from "constants";
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    profit:{
        type:Number,
        default:0
    },
    loss:{
        type:Number,
        default:0
    }
})
const Account=mongoose.models.Account || mongoose.model("Account",accountSchema)
export default Account