import Permission from "../models/permissions.js";
import { statusCodes } from "../utils/statusCodes.js";
import { messages } from "../utils/messages.js";
const create_permission = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
    await Permission.create({ name: name });
    return res.status(statusCodes.CREATED).json({message:messages.SUCCESS});
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({message:err.message});
  }
};
const get_permission = async (req, res) => {
  try {
    const find_permission = await Permission.find();
    if (find_permission.length === 0 || !find_permission) {
      return res.status(statusCodes.NO_CONTENT).json(messages.NO_CONTENT);
    }
    return res.status(statusCodes.SUCCESS).json(find_permission);
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({message:messages.INTERNAL_SERVER_ERROR});
  }
};
const update_permission = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name)
      return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
    const findAndUpdate = await Permission.findByIdAndUpdate(id, {
      name: name,
    });
    if (!findAndUpdate) {
      return res.status(statusCodes.NO_CONTENT).json({messages:messages.NO_CONTENT});
    }
    return res.status(statusCodes.SUCCESS).json({messages:messages.SUCCESS});
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({messages:messages.INTERNAL_SERVER_ERROR});
  }
};
const delete_permission = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
    const findByIdAndDelete = await Permission.findByIdAndDelete(id);
    if (!findByIdAndDelete) {
      return res.status(statusCodes.NO_CONTENT).json({messages:messages.NO_CONTENT});
    }
    return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS});
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({message:messages.INTERNAL_SERVER_ERROR});
  }
};
export default {
  create_permission,
  get_permission,
  update_permission,
  delete_permission,
};
