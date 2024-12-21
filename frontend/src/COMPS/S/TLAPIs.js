import { constants } from "../../constants.js";


export const getEvs = async (token, skip) => {
  const headers = new Headers({
      // Authorization: `Bearer ${token}`,
      'Accept-Language': constants.getLocaleLanguage(),
      'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const options = {
      method: "GET",
      headers: headers,
  };

  // URL = Domain + APIEnpoint + Params
  const res = await window.fetch(`${constants.domain.getTLDomain()}${constants.apiEndpoints.getEvents}`, options);
  if (res.ok) {
      const ret = await res.json();
      return ret;
  } else {
      return Promise.reject(res);
  }
}

export const iuEv = async (params, token, skip) => {
    const headers = new Headers({
        // Authorization: `Bearer ${token}`,
        'Accept-Language': constants.getLocaleLanguage(),
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone 
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
  
    // URL = Domain + APIEnpoint + Params
    const res = await window.fetch(`${constants.domain.getTLDomain()}${constants.apiEndpoints.iuEv}`, options);
    if (res.ok) {
        const ret = await res.json();
        return ret;
    } else {
        return Promise.reject(res);
    }
}

export const getSRs = async (token, skip) => {
    const headers = new Headers({
        // Authorization: `Bearer ${token}`,
        'Accept-Language': constants.getLocaleLanguage(),
        'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  
    const options = {
        method: "GET",
        headers: headers,
    };
  
    // URL = Domain + APIEnpoint + Params
    const res = await window.fetch(`${constants.domain.getTLDomain()}${constants.apiEndpoints.getSRs}`, options);
    if (res.ok) {
        const ret = await res.json();
        return ret;
    } else {
        return Promise.reject(res);
    }
  }