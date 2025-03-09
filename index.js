import express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
// import corsOptions from "./config/corsOrigin.js";
// // *
// import { helmetMiddleware } from "./security/helmet.js";
// // *
// import {morganMiddleware} from './middleware/logger.js'
// // *
import { connectDB } from "./database/index.js";
// import databaseErrorHandler from "./errors/databaseErrorHandler.js";
// import errorHandler from "./errors/errorHandler.js";
// route
import userRoutes from "./routes/userRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import branchRoutes from  './routes/branchRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
// 
// import userRoutes from './routes/userRoutes.js'
const app=express();
dotenv.config();
const PORT=process.env.PORT;
const HOST=process.env.HOST
// middleware
app.use(express.json());
app.use(cors());
// app.use(helmetMiddleware);
// app.use(morganMiddleware);
// app.use([databaseErrorHandler,errorHandler]);
app.use('/api/auth/user',userRoutes);
app.use('/api/permissions',permissionRoutes);
app.use('/api/branch',branchRoutes);
app.use('/api/customer',customerRoutes);
app.use('/api/account',accountRoutes)
app.get('/',(req, res) =>{
    res.send('hello world');
})
connectDB().then(() => {
    app.listen(PORT,HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to start server:", err);
});