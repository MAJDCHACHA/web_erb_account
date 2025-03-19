import Customer from "../models/customer.js";
import { statusCodes } from "../utils/statusCodes.js";
import { messages } from "../utils/messages.js";
const create_customer=async(req,res)=>{
    try{
        const {nationalId,fullName,phone}=req.body;
        const img = req.file.path;
        if(!nationalId || !fullName|| !phone ||!img){
            return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
        }
        const find=await Customer.findOne({nationalId});
        if(find){
            return res.status(statusCodes.UNAUTHORIZED).json({message:messages.CUSTOMER_EXIST})
        }
        const newCustomer=await Customer.create({nationalId:nationalId,fullName:fullName,phone:phone,img:img});
        return res.status(statusCodes.CREATED).json({message:messages.SUCCESS,date:newCustomer});
    }
    catch(err){
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
}
const get_all_customer=async(req,res)=>{
    try{
                const findCustomer=await Customer.find();
                if(!findCustomer || findCustomer.length===0){
                    return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT})
                }
                const updatedCustomers = findCustomer.map(customer => {
                    return {
                      ...customer.toObject(),
                      img: `https://weberbaccount-production.up.railway.app/uploads/images/${customer.img.split('\\').pop()}`
                    };
                  });
                return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS,data:updatedCustomers});
    }
    catch(err){
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
    }
}
const get_customer_ById=async(req,res)=>{
    try{
        const {nationalId}=req.body;
        if(!nationalId){
            return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
        }
        const findOne=await Customer.findOne({nationalId});
        if(!findOne){
            return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT});
        }
        return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS,data:findOne});
    }
    catch(err){
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
    }
}
const edit_customer=async(req,res)=>{
    try{
        const {id,nationalId,fullName,phone}=req.body;
        if(!id || !fullName|| !phone){
            return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
        }
        const findAndUpdate=await Customer.findByIdAndUpdate(id,{
            nationalId:nationalId,
            fullName:fullName,
            phone:phone,
        },{new:true});
        if(!findAndUpdate){
            return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT});
        }
        return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS,data:findAndUpdate});
    }
    catch(err){
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message})
    }
}
const delete_customer=async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id){
            return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
        }
        const findAndDelete=await Customer.findByIdAndDelete(id);
        if(!findAndDelete){
            return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT});
        }
        return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS});
    }
    
        catch(err){
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
        }
    
}
export default {create_customer,get_all_customer,get_customer_ById,edit_customer,delete_customer}