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
    seen:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    tag:{
        type:String,
        required:true
    }
})
const TransactNotify=mongoose.models.TransactNotify || mongoose.model("TransactNotify",TransactionSchema)
export default TransactNotify