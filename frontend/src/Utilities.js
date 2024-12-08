import { constants } from "./Config/constants.js";


export const getLocaleLanguage = () => {
  const locales = constants.locales;
  let localeLanguage = "en-us";
  const options = { year: "numeric", month: "numeric", day: "numeric" }
  if (locales && locales.length>0){
      const localDateString = (new Date()).toLocaleDateString();
      let found = false;
      locales.map(loc => {
          if (localDateString === (new Date().toLocaleDateString(loc,options)) && !found){
              localeLanguage = loc;
              found = true;
          }
          return loc;
      })
  }
  return localeLanguage;
}