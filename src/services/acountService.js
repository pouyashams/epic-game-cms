import axios from "axios/index";

const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return false
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return false
    }
    return item.value
};

export function searchAcount(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/search-post', data, header);
}

export function sendAcount(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/register-post', data, header);
}

export function editAcount(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/update-post', data, header);
}

export function logOutAccount() {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/logout',{}, header);
}

export function onDeActive(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/sold-post', data, header);
}

export function fetchSchedule(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/fetch-auto-post-scheduled-task', data, header);
}

export function editBot(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/save-or-update-auto-post-scheduled-task', data, header);
}

export function onDelete(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/delete-post', data, header);
}

export function onActive(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/send-post', data, header);
}

export function onRemove(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/remove-post', data, header);
}

export function saveOrUpdateDefaultPostAttributes(data) {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/save-or-update-default-post-attributes', data, header);
}

export function fetchUserDefaultPostAttributes() {
    const header = {
        headers: {
            "x-auth": getWithExpiry("token")
        }
    };
    return axios.post('https://epicgameservices.ir/api/fetch-user-default-post-attributes', {}, header);
}



