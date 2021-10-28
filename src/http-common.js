import axios from "axios";

const URL = "https://localhost:44360/"

export default axios.create({
    baseURL: URL,
    headers: {
        "Content-type": "application/json"
    }
});