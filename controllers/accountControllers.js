import Account from "../models/account.js";
import { statusCodes } from "../utils/statusCodes.js";
import { messages } from "../utils/messages.js";
const create_account = async (req, res) => {
  try {
    const { name, code,parent, accountType, branchId, currency, userId } =
      req.body;
    if (
      !name ||
      !code ||
      !accountType ||
      !branchId ||
      !currency ||
      !userId
    ) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ messages: messages.BAD_REQUEST });
    }
    const find_account = await Account.findOne({ name });
    if (find_account) {
      return res
        .status(statusCodes.SUCCESS)
        .json({ message: messages.ACCOUNT_EXISTS });
    }
    const new_account=await Account.create({
        name:name,
        code:code,
        parent:parent,
        accountType:accountType,
        currency:currency,
        branchId:branchId,
        userId:userId
    });
    return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS,
        data:new_account
    });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
const get_account = async (req, res) => {
  try {
    // const find_account = await Account.find().populate("branchId", "name -_id");;
    // if (!find_account || find_account.length === 0)
    //   return res
    //     .status(statusCodes.NO_CONTENT)
    //     .json({ message: messages.NO_CONTENT });
    // return res.status(statusCodes.SUCCESS).json({ data: find_account });
    const accounts = await Account.aggregate([
        {
          $graphLookup: {
            from: "accounts", // اسم مجموعة الحسابات في قاعدة البيانات
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parent",
            as: "children",
          },
        },
        {
          $match: { parent: null }, // جلب الحسابات الرئيسية فقط
        },
        {
          $sort: { code: 1 }, // ترتيب الحسابات حسب الكود
        },
      ]);
  
      res.status(200).json(accounts);
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};
const get_account_ByID = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: messages.BAD_REQUEST });
    const findOne = await Account.findById(id);
    if (!findOne)
      return res
        .status(statusCodes.NO_CONTENT)
        .json({ message: messages.NO_CONTENT });
    return res.status(statusCodes.SUCCESS).json({ data: findOne });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
const edit_account = async (req, res) => {
  try {
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
const delete_account = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: messages.BAD_REQUEST });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
export default {
  create_account,
  get_account,
  get_account_ByID,
  edit_account,
  delete_account,
};
