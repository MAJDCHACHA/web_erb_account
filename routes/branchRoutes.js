import express from 'express';
import branchControllers from "../controllers/branchControllers.js";
const router =express.Router();
router.route("/add").post(branchControllers.create_branch);
router.route("/get").get(branchControllers.get_branch);
router.route("/edit").put(branchControllers.update_branch);
router.route("/delete").delete(branchControllers.delete_branch);
export default router;