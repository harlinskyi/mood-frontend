import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:41849/",
    headers: {
        "Content-type": "application/json"
    }
});