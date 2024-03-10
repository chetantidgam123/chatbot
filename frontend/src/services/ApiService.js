import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:4000/api/',
});

const post_data = (endpoint, data, _headers) => {
    var hdrs = { 'Content-Type': 'application/json', };
    if (_headers) {
        try {
            Object.entries(_headers).map(([key, value]) => {
                hdrs[key] = value;
            });
        } catch (_) {
        }
    }
    return apiService.post(endpoint, data, { headers: hdrs });
};

const post_upload = (endpoint, formData, _headers) => {
    var hdrs = { 'Content-Type': 'multipart/form-data', };
    if (_headers) {
        try {
            Object.entries(_headers).map(([key, value]) => {
                hdrs[key] = value;
            });
        } catch (_) {
        }
    }
    return apiService.post(endpoint, formData, { headers: hdrs });
};

const post_entity = (endpoint, data, loginData) => {
    var hdrs = {
        'Content-Type': 'application/json',
        'x-access-token': loginData.access_token,
        'x-auth-key': loginData.api_auth_key,
    };
    return apiService.post(endpoint, data, { headers: hdrs });
};

const post_entity_upload = (endpoint, formData, loginData) => {
    var hdrs = { 
        'Content-Type': 'multipart/form-data',
        'x-access-token': loginData.access_token,
        'x-auth-key': loginData.api_auth_key,
 };     
    return apiService.post(endpoint, formData, { headers: hdrs });
};

const post_admin = (endpoint, data, loggedData) => {
    return apiService.post(endpoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedData.access_token,
            'x-auth-key': loggedData.api_auth_key
        }
    });
};

const post_admin_upload = (endpoint, formData, loggedData) => {
    var hdrs = { 
        'Content-Type': 'multipart/form-data',
        'x-access-token': loggedData.access_token,
        'x-auth-key': loggedData.api_auth_key,
 };     
    return apiService.post(endpoint, formData, { headers: hdrs });
};

const get_data = (endpoint, data) => {
    return apiService.get(endpoint, data, { headers: { 'Content-Type': 'application/json', } });
};



export {
    post_data,
    post_upload,
    post_entity,
    post_entity_upload,
    post_admin,
    get_data,
    post_admin_upload
}
