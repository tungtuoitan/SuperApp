import {getFos} from "../GAPIs";
import {useFoStore} from "./FoStore";
import {Fo} from "./FoTypes";


export const useFoHelpers = () => {
    const { setAllFos, allFos, curFoId, lastFoId } = useFoStore();
    
    const loadFos = () => {
        getFos().then((fos: Fo[]) => {
            let proData = fos.filter((pr) => pr.activeC == "Act");
            setAllFos(proData);
        });
    }

    return {
        loadFos,
    }
}