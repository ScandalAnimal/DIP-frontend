const initialState = {
  loading: false,
  error: false,
};

export const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STARTED':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS':
      return {
        ...action.payload,
        loading: false,
        error: false,
      };
    case 'FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};
