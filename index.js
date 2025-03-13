// import express from "express";
// import dotenv from 'dotenv'
// import cors from 'cors';
// import corsOption from "./config/corsOrigin.js";
// // // *
// // import { helmetMiddleware } from "./security/helmet.js";
// // // *
// // import {morganMiddleware} from './middleware/logger.js'
// // // *
// import { connectDB } from "./database/index.js";
// // import databaseErrorHandler from "./errors/databaseErrorHandler.js";
// // import errorHandler from "./errors/errorHandler.js";
// // route
// import userRoutes from "./routes/userRoutes.js";
// import permissionRoutes from "./routes/permissionRoutes.js";
// import branchRoutes from  './routes/branchRoutes.js'
// import customerRoutes from './routes/customerRoutes.js'
// import accountRoutes from './routes/accountRoutes.js'
// import setupSwagger from "./docs/swaggerConfig.js"; // Load Swagger config
// // https://weberbaccount-production.up.railway.app
// const app=express();
// dotenv.config();
// const PORT=process.env.PORT||3000;
// // middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOption));
// // Setup Swagger
// setupSwagger(app);

// // app.use(helmetMiddleware);
// // app.use(morganMiddleware);
// // app.use([databaseErrorHandler,errorHandler]);
// app.use('/api/auth/user',userRoutes);
// app.use('/api/permissions',permissionRoutes);
// app.use('/api/branch',branchRoutes);
// app.use('/api/customer',customerRoutes);
// app.use('/api/account',accountRoutes)

// app.get('/',(req, res) =>{
//     res.send('Abd Houry 00');
// })
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`server running in port :${PORT}`);
//     });
// }).catch(err => {
//     console.error("Failed to start server:", err);
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOption from "./config/corsOrigin.js";
import { connectDB } from "./database/index.js";
import setupSwagger from "./docs/swaggerConfig.js"; // استدعاء ملف Swagger

import userRoutes from "./routes/userRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;
setupSwagger(app);
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));

app.use("/api/auth/user", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/account", accountRoutes);

app.get("/", (req, res) => {
  res.send("Abd Houry 00");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running in port: ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to start server:", err);
});
