import { jwtDecode } from "jwt-decode";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const CheckAuthorization = (roleModule: string, roleClaim?: string[] | undefined) : boolean => {
    let userAuthorized = false;
    const isAuthenticated = useIsAuthenticated();
    const authHeader = useAuthHeader();

    if (isAuthenticated() === true) {
        if (roleModule === 'DASHBOARD') {
            userAuthorized = true;
        } else {
            const decoded = jwtDecode(authHeader || '');
            const decodedString = JSON.parse(JSON.stringify(decoded));

            if (decodedString[roleModule]) {
                let claimsArray = [];
                let isExists = true;

                if (typeof decodedString[roleModule] === 'string') {
                    claimsArray = decodedString[roleModule].split(' ');
                } else {
                    claimsArray = decodedString[roleModule]
                }

                for (let elem of roleClaim || []) {
                    if (claimsArray.includes(elem) !== true) {
                        isExists = false;
                    }
                }
                
                if (isExists === true) {
                    userAuthorized = true;
                }
            }
        }
    }

    return userAuthorized;
}

export default CheckAuthorization;