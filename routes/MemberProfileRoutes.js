const express = require("express");

const {
  getAllMembersProfiles,
  createMemberProfile,
  getMemberProfileById,
  updateMemberProfile,
  deleteMemberProfile,
} = require("../controllers/MemberProfileController");

const router = express.Router();

router.route("/").get(getAllMembersProfiles).post(createMemberProfile);
router.route("/:id").get(getMemberProfileById).put(updateMemberProfile).delete(deleteMemberProfile);

module.exports = router;