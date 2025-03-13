/**
 * @swagger
 * tags:
 *   - name: branch
 *     description: Branch management (add, get, edit, delete).
 */
/**
 * @swagger
 * /api/branch/add:
 *  post:
 *     summary: Create branch
 *     tags: [branch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the branch
 *               location:
 *                 type: string
 *                 description: Location of the branch
 *             required:
 *               - name
 *               - location
 *     responses:
 *       201:
 *         description: Branch created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/branch/get:
 *   get:
 *     summary: Get all branches
 *     tags: [branch]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved branches
 *       204:
 *         description: No Content
 */

/**
 * @swagger
 * /api/branch/edit:
 *   put:
 *     summary: Edit branch data
 *     tags: [branch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - location
 *             properties:
 *               id:
 *                 type: string
 *                 example: "60c72b2f9fd1c4567e123456"
 *               name:
 *                 type: string
 *                 example: "branch_name"
 *               location:
 *                 type: string
 *                 example: "branch_location"
 *     responses:
 *       200:
 *         description: User data successfully updated
 *       400:
 *         description: Incorrect or incomplete data
 */



/**
 * @swagger
 * /api/branch/delete:
 *   delete:
 *     summary: Delete a branch
 *     tags: [branch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "60c72b2f9fd1c4567e123456"
 *     responses:
 *       200:
 *         description: branch successfully deleted
 *       404:
 *         description: branch not found
 */