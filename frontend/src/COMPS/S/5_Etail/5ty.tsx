import { Ev} from "../TLTypes";

export type EtailForm = Omit<Ev, 'isOverlap' | 'isLateNight' | 'lineOrder'>;

export type EtailProps = {
    etailId: number;
};

export type FigmaButtonProps = {
    etail: EtailForm
}