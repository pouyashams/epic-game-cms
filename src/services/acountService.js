import axios from "axios/index";

const headers = {
    headers: {
        "x-auth": sessionStorage.getItem('token')
    }
};

export function searchAcount(data) {
    const header = {
        headers: {
            "x-auth": sessionStorage.getItem('token')
        }
    };
    return axios.post('https://epicgameservices.ir/api/search-post', data, header);
}

export function sendAcount(data) {
    return axios.post('https://epicgameservices.ir/api/register-post', data, headers);
}

export function editAcount(data) {
    return axios.post('https://epicgameservices.ir/api/update-post', data, headers);
}

export function onDeActive(data) {
    return axios.post('https://epicgameservices.ir/api/sold-post', data, headers);
}

export function fetchSchedule(data) {
    const header = {
        headers: {
            "x-auth": sessionStorage.getItem('token')
        }
    };
    return axios.post('https://epicgameservices.ir/api/fetch-auto-post-scheduled-task', data, header);
}

export function updateSchedule(data) {
    return axios.post('https://epicgameservices.ir/update-schedule-task', data, headers);
}

export function editBot(data) {
    return axios.post('https://epicgameservices.ir/api/save-or-update-auto-post-scheduled-task', data, headers);
}

export function onDelete(data) {
    return axios.post('https://epicgameservices.ir/api/delete-post', data, headers);
}

export function onActive(data) {
    return axios.post('https://epicgameservices.ir/api/send-post', data, headers);
}

export function onRemove(data) {
    return axios.post('https://epicgameservices.ir/api/remove-post', data, headers);
}


export function saveOrUpdateDefaultPostAttributes(data) {
    return axios.post('https://epicgameservices.ir/api/save-or-update-default-post-attributes', data, headers);
}


export function fetchUserDefaultPostAttributes() {
    return axios.post('https://epicgameservices.ir/api/fetch-user-default-post-attributes', {}, headers);
}

