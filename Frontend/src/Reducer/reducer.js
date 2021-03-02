const initialState = {
  updater: true,
  uploadImage: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "updateValue":
      return { ...state, updater: action.payload };
    case "uploadImage":
      return { ...state, uploadImage: action.payload };

    default:
      return state;
  }
};

export default reducer;
