import mongoose from "mongoose"
const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    description:{
        type:String,
        default:""
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    members:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    balance:{
        type:Number,
        default:0
    }
})
const Group=mongoose.models.Group || mongoose.model("Group",groupSchema)

export default Group;