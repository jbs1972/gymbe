const memberProfileService = require("../services/MemberProfileServices");
const { sendSuccess, sendError } = require("../utils/responseFormatter");

exports.getAllMembersProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await memberProfileService.getAllMembersProfiles(page, limit);
    sendSuccess(res, result.members, "All member profiles retrieved successfully", 200, result.pagination);
  } catch (err) {
    sendError(res, "Failed to retrieve member profiles", err, 500);
  }
};

exports.createMemberProfile = async (req, res) => {
  try {
    const member = await memberProfileService.createMemberProfile(req.body);
    sendSuccess(res, member, "Member profile created successfully", 201);
  } catch (err) {
    sendError(res, "Failed to create member profile", err, 500);
  }
};

exports.getMemberProfileById = async (req, res) => {
  try {
    const member = await memberProfileService.getMemberProfileById(req.params.id);
    if (!member) {
      return sendError(res, "Member profile not found", null, 404);
    }
    sendSuccess(res, member, "Member profile retrieved successfully", 200);
  } catch (err) {
    sendError(res, "Failed to retrieve member profile", err, 500);
  }
};

exports.updateMemberProfile = async (req, res) => {
  try {
    const member = await memberProfileService.updateMemberProfile(req.params.id, req.body);
    if (!member) {
      return sendError(res, "Member profile not found", null, 404);
    }
    // Return only the updated fields from request body
    const updatedData = {};
    Object.keys(req.body).forEach(key => {
      updatedData[key] = member[key];
    });
    sendSuccess(res, updatedData, "Member profile updated successfully", 200);
  } catch (err) {
    sendError(res, "Failed to update member profile", err, 500);
  }
};

exports.patchMemberProfile = async (req, res) => {
  try {
    const member = await memberProfileService.patchMemberProfile(
      req.params.id,
      req.body
    );

    if (!member) {
      return sendError(res, "Member profile not found", null, 404);
    }

    sendSuccess(
      res,
      "Member profile partially updated successfully",
      member,
      200
    );
  } catch (err) {
    sendError(res, "Failed to update member profile", err, 500);
  }
};

exports.deleteMemberProfile = async (req, res) => {
  try {
    const member = await memberProfileService.deleteMemberProfile(req.params.id);
    if (!member) {
      return sendError(res, "Member profile not found", null, 404);
    }
    // Return 204 No Content
    res.status(204).send();
  } catch (err) {
    sendError(res, "Failed to delete member profile", err, 500);
  }
};
