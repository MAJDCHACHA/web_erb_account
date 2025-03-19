import { statusCodes } from "../utils/statusCodes.js";
import { messages } from "../utils/messages.js";
import Branch from '../models/branch.js';
import seedAccounts from "./accountSeeder.js";
import Account from "../models/account.js";
// const create_branch=async(req,res)=>{
//     try{
//             const {name,location}=req.body;
//             if(!name || !location) {
//                 return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
//             }
//             const findOne=await Branch.findOne({name});
//             if(findOne) {return res.status(statusCodes.EXISTS).json({message:messages.BRANCH})}
//             const branchCount = await Branch.countDocuments();
//              const isFirstBranch = branchCount === 0;
//             const new_branch= await Branch.create({name:name,location:location});
//             if(isFirstBranch){
//                 seedAccounts(new_branch._id,new_branch.name,true)
//             }
//             seedAccounts(new_branch._id,new_branch.name,true);
//             return res.status(statusCodes.CREATED).json({messages:messages.SUCCESS,data:new_branch})
//     }
//     catch(err){
//          res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:err.message});
//     }
// }
const create_branch = async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: messages.BAD_REQUEST });
    }

    const findOne = await Branch.findOne({ name });
    if (findOne) {
      return res.status(statusCodes.EXISTS).json({ message: messages.BRANCH });
    }

    const branchCount = await Branch.countDocuments();
    const isFirstBranch = branchCount === 0;
    
    const new_branch = await Branch.create({ name, location });

    await seedAccounts(new_branch._id, new_branch.name, isFirstBranch);

    return res.status(statusCodes.CREATED).json({ message: messages.SUCCESS, data: new_branch });
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
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
const get_account_tree_branch = async (req, res) => {
  try {
    const { branchId } = req.params;   
    if (!branchId) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: messages.BAD_REQUEST });
    }

    
    const accounts = await Account.find({ branchId }).sort({ code: 1 });
    const accountMap = {};
    accounts.forEach(account => {
      accountMap[account._id] = { ...account._doc, children: [] };
    });
    const tree = [];
    accounts.forEach(account => {
      if (account.parent) {      
        if (accountMap[account.parent]) {
          accountMap[account.parent].children.push(accountMap[account._id]);
        }
      } else {
        tree.push(accountMap[account._id]);
      }
    });

    return res.status(200).json({ success: true, data: tree });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }}
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
    ,update_branch,delete_branch,
    get_account_tree_branch
}