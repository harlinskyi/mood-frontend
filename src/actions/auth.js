import jwt from "jsonwebtoken";
// import setAuthorisationToken from "../utils/setAuthorisationToken";
import { LOGIN_AUTH } from "./types";



export const authUser = (token, dispatch) => {
    var user = jwt.decode(token);
    console.log("user auth: ", user);
    // console.log("test")
    // setAuthorisationToken(token);
    dispatch({type: LOGIN_AUTH, data: user});
}