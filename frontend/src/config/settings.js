export const constants = {
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
}