import http from "../http-common";

class AccountService {
    register(data) {
        return http.post("create-user", data);
    }
    login(data) {
        return http.post("log-in", data);
    }
    updateSettings(data, userId) {
        return http.post(`update-user-profile?id=${userId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    createPost(data, userId) {
        return http.post(`create-post?id=${userId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new AccountService();