import mongoose from "mongoose";
const CustomerSchema=new mongoose.Schema({
    nationalId:{
            type:String,
            unique: true,
            required:true
        },
        fullName:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        img:{
            type:String,
            require:true
        },
        isActive:{
            type:Boolean,
            default:0
        }
},{ timestamps: true ,versionKey: false});
const Customer=mongoose.model('Customer', CustomerSchema);
export default Customer;