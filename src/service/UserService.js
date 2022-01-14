import axios from 'axios';

export class UserService {

    token = null;
    config = null;
    baseUrl = null;

    constructor(token) {
        this.token = token;
        this.config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.baseUrl = "http://localhost:4000/";
    }

    getUsers() {
        return axios.get(this.baseUrl + 'users', this.config);
    }

}