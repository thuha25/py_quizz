export class AuthenticationService {
    host_url = import.meta.env.VITE_QUIZAPP_API_URL
    constructor() {}

    async login(email = null, password = null) {
        if(email == null && password == null) {
            var access_token = localStorage.getItem("PYQUIZ_ACCESS")
            if(access_token == null)
                return Promise.reject("No access token")
            return fetch(`${this.host_url}/login`, {
                method: "POST",
                headers: {
                    "Authorization": access_token
                }
            })
            .then((res) => res.json())
            .then(data => {
                if(data.error != null) {
                    return Promise.reject(data.error + ": " + data.message);
                }
                let access_token = data.result.access_token
                let refresh_token = data.result.refresh_token
                localStorage.setItem("PYQUIZ_ACCESS", access_token);
                localStorage.setItem("PYQUIZ_REFRESH", refresh_token);
                return data;
            })
            .catch(reason => {
                console.log(reason)
            })
        }
        return fetch(`${this.host_url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then((res) => res.json())
            .then(data => {
                if(data.error != null) {
                    return Promise.reject(data.error + ": " + data.message);
                }
                let access_token = data.result.access_token
                let refresh_token = data.result.refresh_token
                localStorage.setItem("PYQUIZ_ACCESS", access_token);
                localStorage.setItem("PYQUIZ_REFRESH", refresh_token);
                return data;
            })
    }

    async logout() {
        var access_token = localStorage.getItem("PYQUIZ_ACCESS")
        if(access_token == null)
            return Promise.reject("Not login yet")
        return fetch(`${this.host_url}/logout`, {
            method: "POST",
            headers: {
                "Authorization": access_token
            }
        }).then(data => {
            if(data.error != null) {
                return Promise.reject(data.error + ": " + data.message);
            }
            return data
        })
        .catch(reason => {
            console.log(reason)
        })
    }

    async register(email, username, password) {
        return fetch(`${this.host_url}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "username": username,
                "password": password
            })
        }).then((res) => res.json())
            .then(data => {
                if(data.error != null) {
                    return Promise.reject(data.error + ": " + data.message);
                }
                return data;
            })
    }

    wrapHeader(header) {
        var access_token = localStorage.getItem("PYQUIZ_ACCESS")
    }
}