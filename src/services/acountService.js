import axios from "axios/index";

const token = Buffer.from(`${sessionStorage.getItem('username')}:${sessionStorage.getItem('password')}`, 'utf8').toString('base64');
const headers = {
    headers: {
        'Authorization': `Basic ${token}`
    }
};

export function searchAcount(data) {
    return axios.post('https://epicgameservices.ir/fetch-accounts', data, headers);
}

export function sendAcount(data) {
    return axios.post('https://epicgameservices.ir/add-account', data, headers);
}

export function postAllAcount() {
    return axios.post('https://epicgameservices.ir/post-accounts', {}, headers);
}

export function onDeActive(data) {
    return axios.post('https://epicgameservices.ir/deActive-account', data, headers);
}

export function onActive(data) {
    return axios.post('https://epicgameservices.ir/post-account', data, headers);
}

export function onRemove(data) {
    return axios.post('https://epicgameservices.ir/remove-account',data, headers);
}

export function removeAllAcount() {
    return axios.post('https://epicgameservices.ir/remove-accounts', {}, headers);
}

