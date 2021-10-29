import http from "../http-common";

class CustomFunc {
    getBaseUrl(betweenPath = '') {
        return http.defaults.baseURL + betweenPath;
    }
    getUserIdFromUrl(pathname) {
        let id = ''
        if (pathname !== '' && pathname !== null) {
            id = /[0-9]+/g.exec(pathname)[0];
        }
        return (id);
    }
    isNotEmpty(value) {
        let string = (value !== undefined && value !== null && value !== '') ? true : false;
        return string
    }
}

export default new CustomFunc();