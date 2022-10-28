import { AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT } from "react-admin";

import { API_URL } from "./Constants";

export default (type, params) => {
    // Uncomment for debugging
    console.log("AuthProvider =>", type, params);

    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("grant_type", "password");

        const request = new Request(`${API_URL}/v1/login/access-token`, {
            method: "POST",
            body: formData
            // credentials: "include",
            // headers: new Headers({ "Content-Type": "application/json" })
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(response => {
                // console.log(response)
                localStorage.setItem("token", response.access_token);
            });
        return Promise.reject();
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem("token");
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("token");
            return Promise.reject();
        }
        return Promise.resolve();
    }

    return Promise.resolve();
};
