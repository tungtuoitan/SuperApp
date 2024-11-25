import { useLoginStore } from "../store/loginStore"

export function useLoginHelper() {
    const { loginForm, setLoginForm, formHelper, setFormHelper } = useLoginStore()

    const validateEmail = (email: string): boolean => {
        const children = email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        if (children === null) return false; // false means there is an error
        return true // false means GOOD
    };

    const validatePassword = (password: string): boolean => {
        // password must be: 
        // at least 8 characters long 
        // contain at least 1 number and 1 letter
        // contain at least 1 special character
        const children = password
        .match(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        );
        console.log("children:", children);

    if (children === null) {
        return false; // false means there is an error
    }
    return true // false means GOOD
};

return {
    validateEmail,
    validatePassword,
}

}

