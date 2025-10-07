
import { constants } from "../../constants.js";


export const _loginDefault = async (token, emailOrPhone, password) => {
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
        // "Accept-Language": constants.getLocaleLanguage(),
    });

    const body = JSON.stringify({
        emailOrPhone: emailOrPhone,
        password: password
    });


    const options = {
        method: "POST",
        headers: headers,
        body
    };

    // URL = env + APIEnpoint + Params
    const res = await window.fetch(`${constants.env.getBaseUrl()}${constants.endpoints.login}`, options);
    if (res.ok) {
        const ret = await res.json();
        return ret;
    } else {
        return Promise.reject(res);
    }
};


export const _exchangeCodeForToken = async (code) => {
    const tokenUrl = "https://localhost:5000/auth/exchangeAuthorizationCodeForToken";
    const headers = {
        "Content-Type": "application/json",
    }
    const res = await fetch(tokenUrl, {
        method: "POST", 
        headers,
        body: JSON.stringify({
            code: code,
          }),
    });

    if (res.ok) {
        const ret = await res.json();
        return ret;
    } else {
        return Promise.reject(res);
    }
};