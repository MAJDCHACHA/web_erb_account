import { statusCodes } from "../utils/statusCodes.js";
import { messages } from "../utils/messages.js";
import Branch from '../models/branch.js';
import seedAccounts from "./accountSeeder.js";

const create_branch=async(req,res)=>{
    try{
            const {name,location}=req.body;
            if(!name || !location) {
                return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
            }
            const findOne=await Branch.findOne({name});
            if(findOne) {return res.status(statusCodes.EXISTS).json({message:messages.EXISTS})}
            const new_branch= await Branch.create({name:name,location:location});
            await seedAccounts(new_branch._id);
            return res.status(statusCodes.CREATED).json({messages:messages.SUCCESS,data:new_branch})
    }
    catch(err){
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
    }
}
const get_branch=async(req,res)=>{
    try{
            const find_branch=await Branch.find();
            if(!find_branch || find_branch.length===0){
                return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT});
            }
            return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS,date:find_branch});
    }
    catch(err){
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
    }
}
const update_branch=async(req,res)=>{
    try{
        const {name,location,id}=req.body;
        if(!name|| !location || !id){
            return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
        }
        const findAndUpdate=await Branch.findByIdAndUpdate(id,{
            name:name,
            location:location
        });
        if(!findAndUpdate){
            return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT});
        }
        return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS});

    }
    catch(err){
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
    }
}
const delete_branch=async(req,res)=>{
    try{
            const {id}=req.body;
            if(!id){
                return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
            }
            const findAndDelete=await Branch.findByIdAndDelete(id)
            if(!findAndDelete){
                return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT});
            }
            return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS});
    }
    catch(err){
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
    }
}
export default {create_branch,get_branch
    ,update_branch,delete_branch
}