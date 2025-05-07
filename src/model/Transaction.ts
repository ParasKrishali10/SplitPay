import mongoose from "mongoose";
const TransactionSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String
    },
    approved:{
        type:Boolean,
        default:null
    },
   ss:{
    type:String
   },
   createdAt:{
    type:Date,
    default:Date.now
    },
    amount:{
        type:Number,
        default:0
    }
})
const Transaction=mongoose.models.Transaction || mongoose.model("Transaction",TransactionSchema)
export default Transaction