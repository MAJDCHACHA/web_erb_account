// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userControllers.js';
import verify from '../middleware/verify.js'
import ratelimiting from '../middleware/ratelimiting.js';
const router = express.Router();
router.route('/login').post(ratelimiting.ratelimiterLogin,userController.login_user);
router.route('/refresh').get(userController.refresh_user);
router.use(verify);
router.route('/add').post(userController.create_user);
router.route('/get').get(userController.get_user);
router.route('/getByID').get(userController.get_user_ID);
router.route('/edit').put(userController.edit_user)
router.route('/delete').delete(userController.delete_user);
export default router;
