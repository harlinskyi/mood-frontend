import jwt from "jsonwebtoken";
// import setAuthorisationToken from "../utils/setAuthorisationToken";
import { LOGIN_AUTH } from "./types";


export const authUser = (token, dispatch) => {
    var user = "eyJhbCI6IkhTMjU2IiwiYWxnIjoiSFMyNTYifQ.eyJtYWlsIjoidXNlckBtYWlsLmNvbSJ9.S6ZM7HBjFXaILwnWBmbMAl4pmO9kpsfxF5MVsTajXdE";
    user = jwt.decode(token);
    console.log("user auth: ", user);
    // setAuthorisationToken(token);
    dispatch({type: LOGIN_AUTH, data: user});
}