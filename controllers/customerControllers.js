import Customer from "../models/customer.js";
import { statusCodes } from "../utils/statusCodes.js";
import { messages } from "../utils/messages.js";
// const create_customer=async(req,res)=>{
//     try{
//         const {nationalId,fullName,phone}=req.body;
//         const img = req.file.path;
//         if(!nationalId || !fullName|| !phone ||!img){
//             return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
//         }
//         const find=await Customer.findOne({nationalId});
//         if(find){
//             return res.status(statusCodes.UNAUTHORIZED).json({message:messages.CUSTOMER_EXIST})
//         }
//         const newCustomer=await Customer.create({nationalId:nationalId,fullName:fullName,phone:phone,img:img});
//         return res.status(statusCodes.CREATED).json({message:messages.SUCCESS,date:newCustomer});
//     }
//     catch(err){
//         return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
//     }
// }
// const get_all_customer = async (req, res) => {
//     try {
//         const findCustomer = await Customer.find();
//         if (!findCustomer || findCustomer.length === 0) {
//             return res.status(statusCodes.NO_CONTENT).json({ message: messages.NO_CONTENT });
//         }

//         const baseUrl = `${req.protocol}://${req.get('host')}`; // رابط السيرفر الأساسي

//         const updatedCustomers = findCustomer.map(customer => {
//             let imagePath = customer.img;

//             // تأكد من أن الصورة لا تحتوي على مسار مكرر
//             if (!imagePath.startsWith('/uploads/images/')) {
//                 imagePath = `/uploads/images/${imagePath.split('/').pop()}`;
//             }

//             return {
//                 ...customer.toObject(),
//                 img: `${baseUrl}${imagePath}`
//             };
//         });

//         return res.status(statusCodes.SUCCESS).json({ message: messages.SUCCESS, data: updatedCustomers });
//     } catch (err) {
//         return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
//     }
// };

import fs from 'fs';
import path from 'path';

const create_customer = async (req, res) => {
  try {
    const { nationalId, fullName, phone } = req.body;

    // Get the uploaded file path
    const imgPath = req.file.path;

    // Read the file and convert it to a Base64 string
    const imgBase64 = fs.readFileSync(imgPath, 'base64');

    // Make sure required fields are provided
    if (!nationalId || !fullName || !phone || !imgBase64) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: messages.BAD_REQUEST });
    }

    // Check if customer already exists
    const find = await Customer.findOne({ nationalId });
    if (find) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: messages.CUSTOMER_EXIST });
    }

    // Create new customer with base64 image
    const newCustomer = await Customer.create({ nationalId, fullName, phone, img: imgBase64 });
    return res.status(statusCodes.CREATED).json({ message: messages.SUCCESS, data: newCustomer });
  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const get_all_customer = async (req, res) => {
    try {
      const findCustomer = await Customer.find();
      if (!findCustomer || findCustomer.length === 0) {
        return res.status(statusCodes.NO_CONTENT).json({ message: messages.NO_CONTENT });
      }
  
      // Attach the base64 image data to the response
      const updatedCustomers = findCustomer.map(customer => {
        return {
          ...customer.toObject(),
          img: `data:image/jpeg;base64,${customer.img}`,  // Use base64 string in img tag
        };
      });
  
      return res.status(statusCodes.SUCCESS).json({ message: messages.SUCCESS, data: updatedCustomers });
    } catch (err) {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
  
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