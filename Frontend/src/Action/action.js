const action = {
  updateValue: (data) => {
    return {
      type: "updateValue",
      payload: data,
    };
  },
};

export default action;
