import { FC } from "react";
import { useFilterItemEvents } from "./ItemEvents";
import { SelectedItem, StyledChip } from "./shareStyles";
import {DropDownGridOptions, SelectionModel} from "../6ty";

interface FilterItemProps {
    color: string;
    ids: SelectionModel;
    list: DropDownGridOptions[];
    source: string;
}

export const FilterItem: FC<React.PropsWithChildren<React.PropsWithChildren<FilterItemProps>>> = (props: FilterItemProps) => {
    const { color, ids, list, source } = props;
    const { onDeleteHandlerFilterItem } = useFilterItemEvents({ source: source });
    return (
        <>
            {
                list && list.length > 0 && ids && ids.length > 0
                    ? ids.map((x) => (
                        <SelectedItem key={x}>
                            <StyledChip
                                color={color}
                                label={`${list[list.findIndex(a => a.code === x.toString())]?.description ?? 'not found'}`}
                                onDelete={() => onDeleteHandlerFilterItem(x)} />
                        </SelectedItem>
                    ))
                    : <></>
            }
        </>
    )
}