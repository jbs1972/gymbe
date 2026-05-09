const memberProfileService = require("../services/MemberProfileServices");

exports.getAllMembersProfiles = async (req, res) => {
  try {
    const members = await memberProfileService.getAllMembersProfiles();
    res.json({ data: members, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMemberProfile = async (req, res) => {
  try {
    const member = await memberProfileService.createMemberProfile(req.body);
    res.json({ data: member, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMemberProfileById = async (req, res) => {
  try {
    const member = await memberProfileService.getMemberProfileById(req.params.id);
    res.json({ data: member, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMemberProfile = async (req, res) => {
  try {
    const member = await memberProfileService.updateMemberProfile(req.params.id, req.body);
    res.json({ data: member, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMemberProfile = async (req, res) => {
  try {
    const member = await memberProfileService.deleteMemberProfile(req.params.id);
    res.json({ data: member, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
