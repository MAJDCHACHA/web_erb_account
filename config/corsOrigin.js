// import allowedOrigin from './allowedOrigin.js';
// import { messages } from '../utils/messages.js';
// import { statusCodes } from '../utils/statusCodes.js';
// const corsOption={
//     origin:(origin,callback)=>{
//         if(allowedOrigin.indexOf(origin)!==-1||!origin){
//             callback(null,true);
//         }
//         else{
//             callback(new Error(messages.ORIGIN));
//         }
//     },
//     credentials:true,
//     optionsSuccessStatus:statusCodes.SUCCESS
// }
// export default corsOption;
const corsOption = {
  origin: "*", // السماح لجميع المواقع
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with", "Accept"],
  credentials: true,
};

export default corsOption;
