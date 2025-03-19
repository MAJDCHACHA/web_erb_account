/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description:  managing permissions (add,get,edit,delete)
 */

/**
 * @swagger
 * /api/permissions/add:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the permission
 *     responses:
 *       201:
 *         description: Permission created successfully
 *       400:
 *         description: Bad request, missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permissions/get:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: Successfully retrieved permissions
 *       203:
 *         description: No content
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permissions/edit:
 *   put:
 *     summary: Update an existing permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *             properties:
 *               id:
 *                 type: string
 *                 description: Permission ID
 *               name:
 *                 type: string
 *                 description: Updated name of the permission
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *       400:
 *         description: Bad request, missing fields
 *       203:
 *         description: No content 
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permissions/delete:
 *   delete:
 *     summary: Delete a permission
 *     tags: [Permissions]
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
 *                 description: ID of the permission to delete
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       400:
 *         description: Bad request, missing ID
 *       203:
 *         description: No content
 *       500:
 *         description: Internal server error
 */
