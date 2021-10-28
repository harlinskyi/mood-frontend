import http from "../http-common";

export default function getBaseUrl(betweenPath = '') {
    return http.defaults.baseURL + betweenPath;
}