const { MemberProfile } = require("../models/MemberProfile.model");

exports.getAllMembersProfiles = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const members = await MemberProfile.find().skip(skip).limit(limit);
  const total = await MemberProfile.countDocuments();
  
  return {
    members,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    }
  };
};

exports.createMemberProfile = async (member) => {
  return await MemberProfile.create(member);
};

exports.getMemberProfileById = async (id) => {
  return await MemberProfile.findById(id);
};

exports.updateMemberProfile = async (id, member) => {
  return await MemberProfile.findByIdAndUpdate(id, member, { new: true, runValidators: true });
};

exports.patchMemberProfile = async (id, patchData) => {
  return await MemberProfile.findByIdAndUpdate(
    id,
    { $set: patchData },
    {
      new: true,
      runValidators: true,
    }
  );
};

exports.deleteMemberProfile = async (id) => {
  return await MemberProfile.findByIdAndDelete(id);
};
