const initialState = {
  updater: false,
  uploadImage: true,
  storeUserInfo: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "updateValue":
      return { ...state, updater: action.payload };
    case "uploadImage":
      return { ...state, uploadImage: action.payload };
    case "storeUserInfo":
      return {...state, storeUserInfo:action.payload };
    default:
      return state;
  }
};

export default reducer;
