import http from "../http-common";

class AccountService {
    register(data){
        return http.post("create-user", data);
    }
    login(data){
        return http.post("log-in", data);
    }
    updateSettings(data, userId) {
        return http.post("update-settings/" + userId , data)
    }
}

export default new AccountService();