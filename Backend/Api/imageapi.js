const imageInfo = require("../Schemas/imageSchema");

module.exports = {
  uploadImage: async function (data) {
    imageInfo.create(data);
    return "Image Uploaded";
  },

  fetchUser: async function (data) {
    return imageInfo.find({}).then((res) => {
      return res;
    });
  },

  getImageInfo: async function (data) {
    return imageInfo.findOne({ _id: data }).then((res) => {
      return res;
    });
  },

  updateLikes: async function (data) {
    return imageInfo
      .updateOne(
        { $and: [{ _id: data._id }, { likedby: { $ne: data.email } }] },
        { $inc: { likes: +1 }, $push: { likedby: data.email } }
      )
      .then((res) => {
        return res;
      });
  },

  updateDislikes: async function (data) {
    return imageInfo
      .updateOne(
        { $and: [{ _id: data._id }, { likedby: data.email }] },
        { $inc: { likes: -1 }, $pull: { likedby: data.email } }
      )
      .then((res) => {
        return res;
      });
  },

  addComment: async function (data) {
    console.log(data.comment);
    return await imageInfo
      .updateOne(
        { _id: data._id },
        {
          $push: {
            comments: [
              { value: data.comment, by: data.email, time: data.date },
            ],
          },
        }
      )
      .then((res) => {
        return res;
      });
  },
};
