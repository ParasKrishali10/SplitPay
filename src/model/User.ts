import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8,default:"12345678"},
    mobile:{type:Number,required:true,default:9432142176,unique:true},
    image:{type:String ,default: "https://github.com/shadcn.png"}
})

const User=mongoose.models.User || mongoose.model("User",userSchema)

export default User;