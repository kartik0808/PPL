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
};

export default action;
