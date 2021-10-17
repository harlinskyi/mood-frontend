import http from "../http-common";

class AccountService {
    register(data){
        return http.post("create-user", data);
    }
    login(data){
        return http.post("log-in", data);
        // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyZXJha2FoQGdtYWlsLmNvbSIsInVzZXIiOiIxIiwicm9sZSI6InVzZXIifQ.BFrwzwTq26MGr0VxvZd9g0pgL_iP5HI9wAl9mmZ8tr8";
    }
}

export default new AccountService();