const imageInfo = require("../Schemas/imageSchema");

module.exports = {
  // function to upload the information of the image to the database
  uploadImage: async function (data) {
    try {
      await imageInfo.create(data);
      console.log(data.userInfo);
      return "Image Uploaded";
    } catch (err) {
      console.log(err);
    }
  },

  // function to get all images
  fetchAllImages: async function (data) {
    try {
      return await imageInfo
        .find({})
        .populate("userInfo")
        .then((res) => {
          return res;
        });
    } catch (err) {
      console.log(err);
    }
  },

  //function to find the required image
  getImageInfo: async function (data) {
    return imageInfo
      .findOne({ _id: data })
      .populate("userInfo")
      .then((res) => {
        return res;
      });
  },

  // function to add likes to the image
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

  // function to remove likes from the image
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

  // function to add comments to the image
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
