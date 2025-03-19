/**
 * @swagger
 * tags:
 *   - name: account
 *     description: Branch management (add, get, edit, delete).
 */
/**
 * @swagger
 * /api/account/getID/{branchId}:
 *   get:
 *     summary: Get account  by branch ID
 *     tags: [account]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Requested branch ID
 *     responses:
 *       200:
 *         description: account_tree found
 *       404:
 *         description: account_tree not found
 */
