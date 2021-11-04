import jwt from "jsonwebtoken";
import setAuthorisationToken from "../utils/setAuthorisationToken";
import { CHANGE_USER_PHOTO, LOGIN_AUTH, LOGOUT } from "./types";



export const authUser = (token, dispatch) => {
    var user = jwt.decode(token);
    console.log("authUser:", user);
    setAuthorisationToken(token)
    dispatch(
        {
            type: LOGIN_AUTH,
            data: user
        }
    );
    return user.userId;
}

export const logout = (dispatch) => {
    dispatch(
        {
            type: LOGOUT
        }
    );
}

export const changeUserPhoto = (imagePath, dispatch) => {
    dispatch(
        {
            type: CHANGE_USER_PHOTO,
            data: imagePath
        }
    );
}