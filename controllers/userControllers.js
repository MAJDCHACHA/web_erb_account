import User from "../models/user.js";
import Branch from '../models/branch.js'
import { messages } from "../utils/messages.js";
import { statusCodes } from "../utils/statusCodes.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

dotenv.config();
const create_user = async (req, res) => {
  try {
    const { name, email, password, role, permissions,branchID } = req.body;
    if (!name || !email || !password || !role || !Array.isArray(permissions))
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ messages: messages.BAD_REQUEST });
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  const new_user= await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      permissions: permissions,
      branchID:branchID
    });

    return res
      .status(statusCodes.CREATED)
      .json({ messages: messages.USER_CREATED});
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
const get_user = async (req, res) => {
  try {
    const select = await User.find() .populate("permissions", "name -_id")  // لملء أسماء الصلاحيات
    .populate("branchID", "name -_id");
    if (!select || select.length === 0)
      return res
        .status(statusCodes.NO_CONTENT)
        .json({ messages: messages.NO_CONTENT });
    return res
      .status(statusCodes.SUCCESS)
      .json({ messages: messages.SUCCESS, data: select });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ messages: messages.INTERNAL_SERVER_ERROR });
  }
};
const get_user_ID=async(req,res)=>{
  try{
      const {id}=req.body;
      if(!id){
        return res.status(statusCodes.BAD_REQUEST).json({message:messages.BAD_REQUEST});
      }
      const findByPk=await User.findById(id).populate("permissions", "name")  // لملء أسماء الصلاحيات
      .populate("branchID", "name");;
      if(!findByPk || findByPk.length===0){
        return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT});
      }
      return res.status(statusCodes.SUCCESS).json({message:messages.SUCCESS,data:findByPk});
  }
  catch(err){
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message:messages.INTERNAL_SERVER_ERROR})
  }
}
const edit_user = async (req, res) => {
  try {
    const { id,name, email, password, role, permissions, branchID } = req.body;

    // Check if the required fields are present
    if (!name || !email || !password || !role || !Array.isArray(permissions) || !branchID) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message:messages.BAD_REQUEST});
    }

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(statusCodes.NO_CONTENT).json({message:messages.NO_CONTENT});
    }

    // Check if the email is already used by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(400).json({ message: "Email is already in use by another user." });
    }

    // Check if the branch exists
    const branch = await Branch.findById(branchID);
    if (!branch) {
      return res.status(400).json({ message: "Branch not found." });
    }

    // Encrypt the password if it is being changed
    let hashedPassword = password;
    if (password !== user.password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the user details
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.role = role;
    user.permissions = permissions;
    user.branchID = branchID;

    // Save the updated user
    await user.save();

    // Respond with the updated user data
    return res.status(statusCodes.SUCCESS).json({
      message:messages.SUCCESS,
      data: user
    });

  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
const delete_user = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ messages: messages.BAD_REQUEST });
    const findByIdAndDelete = await User.findByIdAndDelete(id);
    if (!findByIdAndDelete)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ messages: messages.NOT_FOUND });
    return res.status(statusCodes.SUCCESS).json({ messages: messages.SUCCESS });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ messages: messages.INTERNAL_SERVER_ERROR });
  }
};
const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ messages: messages.BAD_REQUEST });
    }

    // Find user by email
    const findOne = await User.findOne({ email:email }).populate("permissions", "name")  // لملء أسماء الصلاحيات
    .populate("branchID", "name");
    if(findOne.password)
    // Check if user exists
    if (!findOne || findOne.length===0) {
      return res
        .status(statusCodes.NO_CONTENT)
        .json({ messages: messages.NO_CONTENT });
    }
     const isPasswordValid = await bcrypt.compare(password, findOne.password);
    if (!isPasswordValid) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json({ message:messages.PASSWORD_INVALID});
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: findOne.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5h" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          id: findOne.id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    // Set refresh token in cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   
    // Respond with access token
    return res
      .status(statusCodes.SUCCESS)
      .json({
        message: messages.SUCCESS,
        data: findOne,
        accessToken: accessToken,
      });
      
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ messages: err.message });
  }
};
const refresh_user = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: messages.Unauthorized });
  } else {
    const refresh_Token = cookie.jwt;
    jwt.verify(
      -refresh_Token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err)
          return res
            .status(statusCodes.FORBIDDEN)
            .json({ message: messages.Forbidden });
        const foundUser = await User.findByPk(decoded.UserInfo.id);
        if (!foundUser)
          return res
            .status(statusCodes.UNAUTHORIZED)
            .json({ message: messages.Unauthorized });
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: foundUser.id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        return res.json({ accessToken: accessToken });
      }
    );
  }
};
const logout_user = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(statusCodes.LOGOUT).json({ message: messages.LOGOUT }); // Use 204 (No Content) for empty responses
    } else {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(statusCodes.SUCCESS).json({ message: messages.LOGOUT });
    }
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};
export default {
  create_user,
  get_user,
  get_user_ID,
  edit_user,
  delete_user,
  login_user,
  refresh_user,
  logout_user,
};
