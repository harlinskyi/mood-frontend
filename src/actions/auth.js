import jwt from "jsonwebtoken";
import setAuthorisationToken from "../utils/setAuthorisationToken";
import { LOGIN_AUTH, LOGOUT } from "./types";



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
}

export const logout = (dispatch) => {
    dispatch(
        {
            type: LOGOUT
        }
    );
}