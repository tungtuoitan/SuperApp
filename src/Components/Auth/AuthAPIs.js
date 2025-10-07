
import { constants } from "../../constants.js";

export const login = async ( params, skip) => {
    const headers = new Headers({
        "Accept-Language": constants.getLocaleLanguage(),
    });
    

    const formData = new FormData();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value);
        }
    });

    const options = {
        method: "POST",
        headers: headers,
        body: formData,
    };

    const res = await window.fetch(
        `${constants.env.getBaseUrl()}${constants.endpoints.login}`,
        options
    );

    if (res.ok) {
        const ret = await res.json();
        return ret;
    } else {
        return Promise.reject(res);
    }
};
