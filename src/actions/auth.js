import jwt from "jsonwebtoken";
// import setAuthorisationToken from "../utils/setAuthorisationToken";
import { LOGIN_AUTH } from "./types";


export const authUser = (token, dispatch) => {
    // var user = jwt.decode(token);
    var user = "3272638956891236198>AJSBFkjbCSfdZJXBKB"
    console.log("user auth: ", user);
    // setAuthorisationToken(token);
    dispatch({type: LOGIN_AUTH, data: user});
}