import jwt from "jsonwebtoken";
// import setAuthorisationToken from "../utils/setAuthorisationToken";
import { LOGIN_AUTH } from "./types";



export const authUser = (token, dispatch) => {
    var user = jwt.decode(token);
    user = jwt.decode(token);
    console.log("user auth: ", user);
    // setAuthorisationToken(token);
    dispatch({type: LOGIN_AUTH, data: user});
}