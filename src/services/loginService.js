import axios from "axios/index";


export function createVerification(data) {
    return axios.post('https://epicgameservices.ir/api/create-verification', data);
}

export function verifyCode(data) {
    return axios.post('https://epicgameservices.ir/api/verify', data);
}

export function verifyUserPass(data) {
    return axios.post('https://epicgameservices.ir/api/login', data);
}

