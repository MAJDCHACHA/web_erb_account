import express from 'express';
import  PermissionController from '../controllers/permissionControllers.js';
const router=express.Router();
router.route('/add').post(PermissionController.create_permission);
router.route('/get').get(PermissionController.get_permission);
router.route('/edit').put(PermissionController.update_permission);
router.route('/delete').delete(PermissionController.delete_permission);
export default router;