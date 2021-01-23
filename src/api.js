const API_URL = "http://localhost:5000";
const JSON_HEADERS = { "Content-Type": "application/json" };

export const testCall = () => {
    const url = `${API_URL}`;
    var headers = { ...JSON_HEADERS };

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

export const createPage = (title, purl, body) => {
    const url = `${API_URL}/create`;
    var headers = { ...JSON_HEADERS };

    return fetch(
        url, { 
            method: "POST", 
            headers,
            body: JSON.stringify({
                title: title,
                purl: purl,
                body: body
            })
        }
    ).then(res => res.json());    
}

export const editPage = (content, purl) => {
    const url = `${API_URL}/submit-edit`;
    var headers = { ...JSON_HEADERS };

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