import { REGISTER_AUTH, LOGIN_AUTH, LOGOUT, CHANGE_USER_PHOTO } from "../actions/types";
import store from "../store";

const initialState = {
};

function authReducer(auth = initialState, action) {
    const {type, data} = action;
    
    switch(type){
        case REGISTER_AUTH: {
            return {
                isAuth: true,
                email: data.email,
                role: data.role,
                userId: data.userId
            }
        }
        case LOGIN_AUTH: {
            return {
                isAuth: true,
                email: data.email,
                role: data.role,
                userId: data.userId
            }
        }
        case LOGOUT: {
            return { 
                isAuth: false
            }
        }

        case CHANGE_USER_PHOTO: {
            return { 
                userPhoto: data
            }
        }
        default: 
            return auth;
    }
}

export default authReducer;