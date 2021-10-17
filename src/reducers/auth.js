import { REGISTER_AUTH, LOGIN_AUTH, LOGOUT,  } from "../actions/types";
import store from "../store";

const initialState = {
};

function authReducer(auth = initialState, action) {
    const {type, data} = action;
    console.log("reducer data", data);
    switch(type){
        case REGISTER_AUTH: {
            return {
                isAuth: true,
                email: data.email,
                role: data.role
            }
        }
        case LOGIN_AUTH: {
            return {
                isAuth: true,
                email: data.email,
                role: data.role
            }
        }
        case LOGOUT : {
            return {...auth, auth : {} }
        }
        default: 
            return auth;
    }
}

export default authReducer;