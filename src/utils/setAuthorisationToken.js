import http from "../http-common";

export default function setAuthorisationToken(token) {
  console.log('setAuthorisationToken:', token);
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common['Authorization'];
  }
}