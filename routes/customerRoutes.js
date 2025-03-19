import express from 'express';
import customerControllers from '../controllers/customerControllers.js';
import verify from '../middleware/verify.js'
import { uploadImage } from '../utils/multer.js'; // Import the multer middleware
const router=express.Router();
// router.use(verify);
router.route('/add').post(uploadImage.single("img"),customerControllers.create_customer)
router.route('/get').get(customerControllers.get_all_customer);
router.route('/getById').get(customerControllers.get_customer_ById);
router.route('/edit').put(customerControllers.edit_customer);
router.route('/delete').delete(customerControllers.delete_customer);
export default router;