import mongoose from "mongoose";
const shareSchema=new mongoose.Schema({
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    members:[{

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        profit:{
            type:Number,
            default:0
        },
        loss:{
            type:Number,
            default:0
        }
}],

})
const GroupShare=mongoose.models.GroupShare || mongoose.model("GroupShare",shareSchema)
export default GroupShare