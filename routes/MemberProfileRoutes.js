const express = require("express");

const {
  getAllMembersProfiles,
  createMemberProfile,
  getMemberProfileById,
  updateMemberProfile,
  patchMemberProfile,
  deleteMemberProfile,
} = require("../controllers/MemberProfile.controller");

const router = express.Router();

/**
 * @swagger
 * /api/member_profiles:
 *   get:
 *     summary: Get all member profiles
 *     description: Retrieve a list of all gym member profiles from the database with pagination support
 *     tags:
 *       - Member Profiles
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (default is 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page (default is 10)
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved all member profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MemberProfile'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     pages:
 *                       type: integer
 *                       example: 3
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *                 status:
 *                   type: string
 *                   example: success
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/member_profiles:
 *   post:
 *     summary: Create a new member profile
 *     description: Create a new gym member profile with the provided details
 *     tags:
 *       - Member Profiles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberProfileCreateRequest'
 *     responses:
 *       201:
 *         description: Member profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/MemberProfile'
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/member_profiles/{id}:
 *   get:
 *     summary: Get member profile by ID
 *     description: Retrieve a specific member profile using their ID
 *     tags:
 *       - Member Profiles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Member profile ID (MongoDB ObjectId)
 *         schema:
 *           type: string
 *           example: 689ad54cb72e4c0012d91f11
 *     responses:
 *       200:
 *         description: Member profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/MemberProfile'
 *                 status:
 *                   type: string
 *                   example: success
 *       404:
 *         description: Member profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/member_profiles/{id}:
 *   put:
 *     summary: Update member profile
 *     description: Update specific fields of an existing member profile. Returns only the updated fields.
 *     tags:
 *       - Member Profiles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Member profile ID (MongoDB ObjectId)
 *         schema:
 *           type: string
 *           example: 689ad54cb72e4c0012d91f11
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberProfileUpdateRequest'
 *     responses:
 *       200:
 *         description: Member profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Member profile updated successfully
 *                 data:
 *                   type: object
 *                   description: Only the updated fields are returned
 *                   example:
 *                     memberName: "Jane Doe"
 *                     memberEmail: "jane@example.com"
 *                 status:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Member profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/member_profiles/{id}:
 *   patch:
 *     summary: Partially update a member profile
 *     description: Update one or more fields of a member profile without sending the complete object.
 *     tags: [Member Profiles]

 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Member profile ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberProfilePatchRequest'
 *
 *           examples:
 *             updateSubject:
 *               summary: Update subject only
 *               value:
 *                 memberName: "Updated Member Name"
 *
 *             updateDescription:
 *               summary: Update description only
 *               value:
 *                 memberEmail: "updated@example.com"
 *
 *             updateBoth:
 *               summary: Update both fields
 *               value:
 *                 memberName: "New Member Name"
 *                 memberEmail: "new@example.com"
 *
 *     responses:
 *       200:
 *         description: Member profile partially updated successfully
 *
 *       404:
 *         description: Member profile not found
 *
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/member_profiles/{id}:
 *   delete:
 *     summary: Delete member profile
 *     description: Delete a member profile from the database. Returns 204 No Content with no body.
 *     tags:
 *       - Member Profiles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Member profile ID (MongoDB ObjectId)
 *         schema:
 *           type: string
 *           example: 689ad54cb72e4c0012d91f11
 *     responses:
 *       204:
 *         description: Member profile deleted successfully (No Content)
 *       404:
 *         description: Member profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.route("/").get(getAllMembersProfiles).post(createMemberProfile);
router.route("/:id").get(getMemberProfileById).put(updateMemberProfile).patch(patchMemberProfile).delete(deleteMemberProfile);

module.exports = router;