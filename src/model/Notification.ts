import mongoose from "mongoose";
const notificationSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reciever:[{
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }],
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
const Notification=mongoose.models.Notification || mongoose.model("Notification",notificationSchema)
export default Notification