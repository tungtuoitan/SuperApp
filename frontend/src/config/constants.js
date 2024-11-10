export const constants = {
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
    login: {
        errorMessage: {
            invalidPassword: 'At least 8 characters long, contain at least 1 number, 1 letter and 1 special character',
            notMatchConfirmPassword: 'Confirmation password does not match the password!',
            invalidEmail: 'Invalid email address',
            invalidName: 'Invalid name',
            shortName: 'Name must be at least 3 characters long',
        }
    }
}