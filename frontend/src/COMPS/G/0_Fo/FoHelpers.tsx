import {useAuthStore} from "../../Auth/AuthStore";
import {getFos} from "../GAPIs";
import {useFoStore} from "./FoStore";
import {Fo} from "./FoTypes";


export const useFoHelpers = () => {
    const { setAllFos, allFos, curFoId, lastFoId } = useFoStore();
    const { auth } = useAuthStore();
    const loadFos = async () => {
        getFos(auth.userToken).then((fos: Fo[]) => {
            let proData = fos
            // .filter((pr) => pr.activeC == "Act");
            setAllFos(proData);
            return true;
        });
    }

    return {
        loadFos,
    }
}