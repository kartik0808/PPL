const initialState = {
  updater : true
}

const reducer = (state = initialState,action) => {
  switch(action.type){
    case 'updateValue':
      return {...state,updater : !action.payload}
  }
}

export default reducer