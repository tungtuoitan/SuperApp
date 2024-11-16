import { constants } from "../Config/Constants";
import { getLocaleLanguage } from "../Utilities";


export const getEvs = async (token, skip) => {
  const headers = new Headers({
      // Authorization: `Bearer ${token}`,
      'Accept-Language': getLocaleLanguage(),
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
