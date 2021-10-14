import { REGISTER_AUTH, LOGIN_AUTH } from "../actions/types";

const initialState = {
    isAuth: false, 
    username: ""
};

function authReducer(auth = initialState, action) {
    const {type, data} = action;
    console.log("reducer data", data);
    switch(type){
        case REGISTER_AUTH: {
            return {
                isAuth: true,
                // username: data.name
            }
            
        }
        case LOGIN_AUTH: {
            return {
                isAuth: true,
                // username: data.name
            }
        }
        default: 
            return auth;
    }
}

export default authReducer;