import axios from 'axios';

export class AuthService {
    baseUrl = "http://localhost:4000/";

    makeAuth(user) {
        return axios.post(this.baseUrl + "users/authenticate", user).then(res => res.data);
    }
}
