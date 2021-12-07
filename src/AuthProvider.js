// import { AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT } from "react-admin";

import API_URL from "./Constants";

const AuthProvider = {
    login: ({ username, password }) => {
        const request = new Request(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email: username, password }),
            credentials: "include",
            headers: new Headers({ "Content-Type": "application/json" })
        });
        return fetch(request).then((res) => {
            if (res.status < 200 || res.status >= 300) {
                localStorage.removeItem("authenticated");
                throw new Error(res.statusText);
                // return Promise.reject();
            }
            // Next lines are handy for token based login
            return res.json();
        }).then(auth => {
            localStorage.setItem("authenticated", true);
            localStorage.setItem('token', auth.user.authentication_token);
        }).catch(() => {
            return Promise.reject();
        });
    },
    logout: () => {
        localStorage.removeItem('authenticated');
        console.log('are we called => ');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        return status === 401 || status === 403
            ? Promise.reject()
            : Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('authenticated')
            ? Promise.reject()
            : Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    },
    // (type, params) => {
    // if (type === AUTH_LOGIN) {
    //     const { username, password } = params;

    //     return fetch(request).then(response => {
    //         if (response.status < 200 || response.status >= 300) {
    //             throw new Error(response.statusText);
    //         }
    //         localStorage.setItem("authenticated", true);
    //         // Next lines are handy for token based login
    //         // return response.json()
    //     });
    //     // .then(({ response }) => {
    //     //     debugger;
    //     //     localStorage.setItem('token', response.user.authentication_token);
    //     // });
    // }

    // if (type === AUTH_LOGOUT) {
    // }
    // if (type === AUTH_ERROR) {
    //     const status = params.status;
    //     if (status === 401 || status === 403) {
    //         localStorage.removeItem("authenticated");
    //         return Promise.reject();
    //     }
    //     return Promise.resolve();
    // }

    // return Promise.resolve();
};

export default AuthProvider;