import {Pr} from "../PrTypes";

export type PetailForm = Omit<Pr, 'isOverlap'>;

export type PetailProps = {
    petailId: number;
};
