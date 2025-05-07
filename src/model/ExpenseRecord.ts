import mongoose from "mongoose";
const ExpenseRecordSchema=new mongoose.Schema({
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        group:{
             type:mongoose.Schema.Types.ObjectId,
            ref:'Group'
        }
        ,
        expense:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'GroupExpense'
        },
        message:{
            type:String
        },
        balance:{
            type:Number
        },
        type:{
            type:String,
            enum:['owe','own'],
            required:true
        }
})
const ExpenseRecord=mongoose.models.ExpenseRecord || mongoose.model("ExpenseRecord",ExpenseRecordSchema)

export default ExpenseRecord;