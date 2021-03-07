import store from 'store';

const API_URL = "http://localhost:5000";
const JSON_HEADERS = { "Content-Type": "application/json" };

const backend_headers = () => {
    var headers = { ...JSON_HEADERS };
    var token = store.get('token');

    if(token !== undefined) {
        headers['Authorization'] = "Bearer " + token;
    }

    return headers;
}

export const allPages = () => {
    const url = `${API_URL}/all-pages`   
    var headers = { ...JSON_HEADERS };

    return fetch(
        url, {
            method: "GET",
            headers
        }
    ).then(res => res.json());
}

export const testCall = () => {
    const url = `${API_URL}`;
    var headers = backend_headers();

    return fetch(
        url, { 
            method: "GET", 
            headers
        }
    ).then(res => res.json());
}

export const loadPage = pageUrl => {
    const url = `${API_URL}/page/${pageUrl}`;
    var headers = { ...JSON_HEADERS };

    return fetch(
        url, { 
            method: "GET", 
            headers 
        }
    ).then(res => res.json());
}

export const createPage = (title, body) => {
    const url = `${API_URL}/create`;
    var headers = backend_headers();
    console.log(headers);
    return fetch(
        url, { 
            method: "POST", 
            headers,
            body: JSON.stringify({
                title: title,
                body: body
            })
        }
    ).then(res => res.json());    
}

export const editPage = (content, purl) => {
    const url = `${API_URL}/submit-edit`;
    var headers = backend_headers();

    return fetch(
        url, { 
            method: "POST", 
            headers,
            body: JSON.stringify({
                purl: purl,
                edit_text: content
            })
        }
    ).then(res => res.json());     
}

export const requestLinkedinTokenUrl = () => {
    const url = `${API_URL}/login/linkedin/request`;
    var headers = { ...JSON_HEADERS };

    return fetch(
        url, {
            method: "GET",
            headers
        }
    ).then(res => res.json());
}

export const linkedInFinalize = code => {
    const url = `${API_URL}/login/linkedin/confirm`;
    var headers = { ...JSON_HEADERS };

    return fetch(
        url, {
            method: "POST",
            headers,
            body: JSON.stringify({
                code: code
            })
        }
    ).then(res => res.json());
}