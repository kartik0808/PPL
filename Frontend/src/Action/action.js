const action = {
  updateValue: (data) => {
    return {
      type: "updateValue",
      payload: data,
    };
  },
  uploadImage: (data) => {
    return {
      type: "uploadImage",
      payload: data,
    };
  },
  storeUserInfo:(data) => {
    return {
      type: "storeUserInfo",
      payload: data
    }
  }
};

export default action;
