import { constants } from "../../constants.js";
import {toSid, paSid} from "./GHelpers.tsx";

export const getPrs = async (searchText) => {
    const headers = new Headers({
        // Authorization: `Bearer ${token}`,
        "Accept-Language": constants.getLocaleLanguage(),
    });

    const options = {
        method: "GET",
        headers: headers,
    };

    // URL = env + APIEnpoint + Params
    const res = await window.fetch(
        `${constants.env.getBaseUrl()}${constants.endpoints.getPrs}${
            searchText ? "?searchText=" + searchText : ""
        }`,
        options
    );
    if (res.ok) {
        const ret = await res.json();
        ret.forEach((pr) => {
            pr.id = toSid("Pr", Number(pr.id));
            pr.parentId = pr.parentId ? toSid("Fo", Number(pr.parentId)) : undefined;
        });
        
        return ret;
    } else {
        return Promise.reject(res);
    }
};

export const iuPr = async (params, token, skip) => {
    const headers = new Headers({
        // Authorization: `Bearer ${token}`,
        "Accept-Language": constants.getLocaleLanguage(),
    });

    const formData = new FormData();

    params.id = paSid(params.id).id;
    params.parentId = params.parentId ? paSid(params.parentId).id : undefined;

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

    // console.log(constants.env.getBaseUrl())
    // URL = env + APIEnpoint + Params
    const res = await window.fetch(
        `${constants.env.getBaseUrl()}${constants.endpoints.iuPr}`,
        options
    );
    if (res.ok) {
        const ret = await res.json();
        ret.prs[0].id = toSid("Pr", Number(ret.prs[0].id));
        ret.prs[0].parentId = ret.prs[0].parentId ? toSid("Fo", Number(ret.prs[0].parentId)) : undefined;
        return ret;
    } else {
        return Promise.reject(res);
    }
};

export const updateUserProfilePr = async (params) => {
    const { email = "", appC = "", userProfileJson = "" } = params || {};

    // Initialize the FormData object
    let formData = new FormData();

    // Append form fields
    formData.append("email", email);
    formData.append("appC", appC);
    formData.append("userProfileJson", userProfileJson);

    const options = {
        method: "POST",
        body: formData, // Send FormData in the body
    };

    // Send the request
    const response = await window.fetch(
        `${constants.env.getBaseUrl()}${constants.endpoints.iuUserProfile}`,
        options
    );

    // Handle the response
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return Promise.reject(response);
    }
};

export const getUserProfileJson = async (params) => {
    const { email, appC } = params;
    const headers = new Headers();
    // const bearer = `Bearer ${token}`;

    // headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    };

    const response = await window.fetch(
        `${constants.env.getBaseUrl()}${
            constants.endpoints.getUserProfile
        }?email=${email}&appC=${appC}`,
        options
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return Promise.reject(response);
    }
};

export const getPrParentIds = async (params) => {
    const headers = new Headers();

    const options = {
        method: "GET",
        headers: headers,
    };

    const response = await window.fetch(
        `${constants.env.getBaseUrl()}${constants.endpoints.getPrParentIds}`,
        options
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return Promise.reject(response);
    }
};

export const iuFos = async (params, token, skip) => {
    const headers = new Headers({
        // Authorization: `Bearer ${token}`,
        "Accept-Language": constants.getLocaleLanguage(),
    });

    const formData = new FormData();

    params.id = paSid(params.id).id;
    params.parentId = params.parentId ? paSid(params.parentId).id : undefined;

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

    // console.log(constants.env.getBaseUrl())
    // URL = env + APIEnpoint + Params
    const res = await window.fetch(
        `${constants.env.getBaseUrl()}${constants.endpoints.iuFos}`,
        options
    );
    if (res.ok) {
        const ret = await res.json();
        ret.fos[0].id = toSid("Fo", Number(ret.fos[0].id));
        ret.fos[0].parentId = toSid("Fo", Number(ret.fos[0].parentId));
        return ret;
    } else {
        return Promise.reject(res);
    }
};


export const getFos = async () => {
    const headers = new Headers({
        // Authorization: `Bearer ${token}`,
        'Accept-Language': constants.getLocaleLanguage(),
    });
  
    const options = {
        method: "GET",
        headers: headers,
    };
  
    // URL = env + APIEnpoint + Params
    const res = await window.fetch(`${constants.env.getBaseUrl()}${constants.endpoints.getFos}`, options);
    if (res.ok) {
        const ret = await res.json();
        ret.forEach((fo) => {
            fo.id = toSid("Fo", Number(fo.id));
            fo.parentId = fo.parentId ? toSid("Fo", Number(fo.parentId)) : undefined;
        });
        return ret;
    } else {
        return Promise.reject(res);
    }
  }