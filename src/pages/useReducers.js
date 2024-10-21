export const initialState = null;

export const reducer=(state,action)=>{
    const { type, payload } = action;
    switch (type) {
        case "User":
          console.log("User", payload);
    
          return {
            ...state,
            user: payload.user
          };
        case "updateUser":
          console.log("updateUser", payload);
    
          return {
            ...state,
            user: payload.user
          };
          default:return null;
      }
    };