/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management (login, refreshToken, add, get, getID,edit,delete).
 */

/**
 * @swagger
 * /api/auth/user/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: majd12223@gmal.com
 *               password:
 *                 type: string
 *                 example: "123242546789"
 *     responses:
 *       200:
 *         description: Successfully logged in and returned authentication token
 *       400:
 *         description: Invalid request (missing data)
 *       401:
 *         description: Incorrect password
 */

/**
 * @swagger
 * /api/auth/user/logout:
 *   post:
 *     summary: User logout
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */

/**
 * @swagger
 * /api/auth/user/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6MX0sImlhdCI6MTczNDg2ODMyNiwiZXhwIjoxNzM0OTU0NzI2fQ.BErLejvRCgWrFaGDgEtu1xvCsoarvfd5Tbh_En0hG5U'
 *     responses:
 *       200:
 *         description: Token successfully refreshed
 *       403:
 *         description: Invalid or expired token
 */

/**
 * @swagger
 * /api/auth/user/add:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *               - permissions
 *               - branchID
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ahmed"
 *               email:
 *                 type: string
 *                 example: "ahmed@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: "admin"
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["READ", "WRITE"]
 *               branchID:
 *                 type: string
 *                 example: "60c72b2f9fd1c4567e123456"
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Incomplete or incorrect data
 */

/**
 * @swagger
 * /api/auth/user/get:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       203:
 *         description: No users available
 */

/**
 * @swagger
 * /api/auth/user/getByID/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Requested user ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/auth/user/edit:
 *   put:
 *     summary: Edit user data
 *     tags: [Users]
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
 *               - email
 *               - password
 *               - role
 *               - permissions
 *               - branchID
 *             properties:
 *               id:
 *                 type: string
 *                 example: "60c72b2f9fd1c4567e123456"
 *               name:
 *                 type: string
 *                 example: "Mohamed"
 *               email:
 *                 type: string
 *                 example: "mohamed@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword"
 *               role:
 *                 type: string
 *                 example: "user"
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["READ"]
 *               branchID:
 *                 type: string
 *                 example: "60c72b2f9fd1c4567e123456"
 *     responses:
 *       200:
 *         description: User data successfully updated
 *       400:
 *         description: Incorrect or incomplete data
 */

/**
 * @swagger
 * /api/auth/user/block:
 *   put:
 *     summary: Edit user data
 *     tags: [Users]
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
 *         description:  successfully updated isActive
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auth/user/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
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
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */