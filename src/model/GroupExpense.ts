import mongoose from "mongoose";
const expenseSchema=new mongoose.Schema({
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
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
        required:true
    }
})
const GroupExpense=mongoose.models.GroupExpense || mongoose.model("GroupExpense",expenseSchema)
export default GroupExpense
