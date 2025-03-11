import express from 'express';
import accountControllers from '../controllers/accountControllers.js';
import verify from '../middleware/verify.js'
const router=express.Router();
router.use(verify);
router.route('/add').post(accountControllers.create_account);
router.route('/get').get(accountControllers.get_account);
router.route('/getID').get(accountControllers.get_account_ByID);
router.route('/edit').put(accountControllers.edit_account);
router.route('/delete').delete(accountControllers.delete_account);
export default router