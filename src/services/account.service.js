import http from "../http-common";

class AccountService {
    register(data){
        return http.post("create-user", data);
    }
}

export default new AccountService();