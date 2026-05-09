const MemberProfileModel = require("../models/MemberProfile");

exports.getAllMembersProfiles = async () => {
  return await MemberProfileModel.find();
};

exports.createMemberProfile = async (member) => {
  return await MemberProfileModel.create(member);
};
exports.getMemberProfileById = async (id) => {
  return await MemberProfileModel.findById(id);
};

exports.updateMemberProfile = async (id, member) => {
  return await MemberProfileModel.findByIdAndUpdate(id, member);
};

exports.deleteMemberProfile = async (id) => {
  return await MemberProfileModel.findByIdAndDelete(id);
};
