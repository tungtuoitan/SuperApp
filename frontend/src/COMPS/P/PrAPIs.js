import { constants } from "../../constants.js";


export const getPrs = async (token, skip) => {
  const headers = new Headers({
      // Authorization: `Bearer ${token}`,
      'Accept-Language': constants.getLocaleLanguage(),
  });

  const options = {
      method: "GET",
      headers: headers,
  };

  // URL = env + APIEnpoint + Params
  const res = await window.fetch(`${constants.env.getBaseUrl()}${constants.endpoints.getPrs}`, options);
  if (res.ok) {
      const ret = await res.json();
      return ret;
  } else {
      return Promise.reject(res);
  }
}

export const iuPr = async (params, token, skip) => {
    const headers = new Headers({
        // Authorization: `Bearer ${token}`,
        'Accept-Language': constants.getLocaleLanguage(),
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
  
    // console.log(constants.env.getBaseUrl())
    // URL = env + APIEnpoint + Params
    const res = await window.fetch(`${constants.env.getBaseUrl()}${constants.endpoints.iuPr}`, options);
    if (res.ok) {
        const ret = await res.json();
        return ret;
    } else {
        return Promise.reject(res);
    }
}