
export const constants = {
  // 1. Setting
  setting: {
    accessRightsComponents: {
      finShark: 'finShark',
      learnCSharp: 'learnCSharp',
      nothing: 'nothing',
    },
    isEnvironment: function (env) {
      if (env === this.environment.production)
        return window.location.hostname
      // === this.environment.claims.production.hostname;
      if (env === this.environment.development)
        return window.location.hostname
      // === this.environment.claims.development.hostname;
      if (env === this.environment.uat)
        return window.location.hostname
      // === this.environment.claims.uat.hostname;
      if (env === this.environment.localhost)
        return window.location.hostname
      // === this.environment.claims.localhost.hostname;
      return false;
    },
    environment: {
      development: 'development',
      uat: 'uat',
      production: 'production',
      localhost: 'localhost',
    }
  },

  // 2. Domain
  domain: {
    getTLDomain: function () {
      // if (window.location.hostname === this.environment.plm.production.hostname)
      //   return this.environment.plm.production.apiUrl;
      // if (window.location.hostname === this.environment.plm.uat.hostname)
      //   return this.environment.plm.uat.apiUrl;
      // if (window.location.hostname === this.environment.plm.development.hostname)
      //   return this.environment.plm.development.apiUrl;
      if (window.location.hostname === this.environment.localhost.hostname)
        return this.environment.localhost.apiUrl;
    },
    environment: {
      // pro: {
      //   hostname: 'portal.vanthiel.com',
      //   apiUrl: 'https://vanthiel-plm-webapi.azurewebsites.net/'
      // },
      // uat: {
      //   hostname: 'uat-portal.vanthiel.com',
      //   apiUrl: 'https://vanthiel-plm-webapi-uat.azurewebsites.net/'
      // },
      // dev: {
      //   hostname: 'dev-portal.vanthiel.com',
      //   apiUrl: 'https://vanthiel-plm-webapi-dev.azurewebsites.net/'
      // },
      localhost: {
        hostname: 'localhost',
        apiUrl: 'https://localhost:5001/',  
      }
    },
  },

  // 3. Environment

  // 4. API Endpoints
  apiEndpoints: {
    getEvents: 'Ev/GetEvs',
    iuEv: 'Ev/IuEv',
    getSRs: 'SRs/GetSRs',
  },



  // 5. Messages
  login: {
    errorMessage: {
      invalidPassword: 'At least 8 characters long, contain at least 1 number, 1 letter and 1 special character',
      notMatchConfirmPassword: 'Confirmation password does not match the password!',
      invalidEmail: 'Invalid email address',
      invalidName: 'Invalid name',
      shortName: 'Name must be at least 3 characters long',
    }
  },

  // Locales
  locales: {
    'en-au': 'en-au',
    'en-ca': 'en-ca',
    'en-gb': 'en-gb',
    'en-ie': 'en-ie',
    'en-nz': 'en-nz',
    'en-us': 'en-us',
    'nl-be': 'nl-be',
    'nl': 'nl',
    'sk': 'sk',
    'cs': 'cs',
    'zh-cn': 'zh-cn',
    'zh-hk': 'zh-hk',
    'zh-tw': 'zh-tw',
    'ja': 'ja',
    'fr-ca': 'fa-ca',
    'fr-ch': 'fa-ch',
    'fr': 'fr',
    'vi-vn': 'vi-vn'
},
getLocaleLanguage: () => {
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
}