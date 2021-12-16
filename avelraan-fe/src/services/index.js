import { throwCustomError, throwServerError } from "../helpers";

const baseUrl = 'https://calm-caverns-53586.herokuapp.com/https://avelraangame.azurewebsites.net/api/palantir/';
const headers = new Headers({
    "Content-Type": "application/json"
})

// const getQueryString = (payload) => {
//     return Object.keys(payload).map(key => {
//         return key + '=' + payload[key]
//     }).join('&');
// }

export const signIn = (payload) => {
    return fetch(baseUrl + 'Logon', {
        headers,
        method: 'POST',
        body: JSON.stringify({
            message: JSON.stringify({
                "PlayerName": payload.PlayerName,
                "Ward": payload.Ward,
                "Symbol": payload["Symbol"]
            })
        })
    })
        .then(response => {
            if (response.ok) return response.json();
            else throwServerError(response.status);
        })
        .then(data => {
            if (data['Error']) throwCustomError(data['Error']);
            else return JSON.parse(data.Data);
        })
};

export const signUp = (payload) => {
    return fetch(baseUrl + 'CreatePlayer', {
        headers,
        method: 'POST',
        body: JSON.stringify({
            message: JSON.stringify({
                "PlayerName": payload.PlayerName,
                "Ward": payload.Ward,
                "Wardcheck": payload.Wardcheck,
                "Symbol": payload["Symbol"]
            })
        })
    })
        .then(response => {
            if (response.ok) return response.json();
            else throwServerError(response.status);
        })
        .then(data => {
            if (data['Error']) throwCustomError(data['Error']);
            else return JSON.parse(data.Data);
        })
};