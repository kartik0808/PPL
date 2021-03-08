
  export const updateValue = (data) => {
    return {
      type: "updateValue",
      payload: data,
    };
  }

  export const uploadImage = (data) => {
    return {
      type: "uploadImage",
      payload: data,
    };
  }

  export const storeUserInfoAsync = (data) => {
    return {
      type: "storeUserInfo",
      payload: data
    }
  }

  export const storeUserInfo= data => {
    return dispatch => {
      setTimeout(() => {
        dispatch(storeUserInfoAsync(data))
      },5000)
    }
  }

