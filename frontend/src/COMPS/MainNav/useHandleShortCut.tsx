import { useSnackbar } from "notistack";
import { useTLBaseFgStore } from "../S/2_TLBaseFg/TLBaseFgStore";
import { useChildEvStore } from "../S/4_ChildEv/ChildEvStore";
import { useTLBaseFgHelpers } from "../S/2_TLBaseFg/TLBaseFgHelpers";
import { useTLBaseBgHelpers } from "../S/1_TLBaseBg/TLBaseBgHelpers";
import { addTime, cDateToGh, cDateToUTCDate, GhToCDate, useTimeHelpers } from "../S/3_TimeConfig/TimeHelpers";
import {Ev, EvsResult} from "../S/TLTypes";
import {getAllDescendants} from "../S/2_TLBaseFg/2he";
import {sr} from "../S/TLConstants";
import {iuEv} from "../S/TLAPIs";
import {KeyboardEvent} from "react";
import {useGridContainerStore} from "../G/2_GridContainer/GridContainerStore";
import {useFoStore} from "../G/0_Fo/FoStore";
import {deepClone} from "@mui/x-data-grid/internals";
import {g} from "../G/GConstants";
import {Pr, PrsResult} from "../G/GTypes";
import {Fo} from "../G/0_Fo/FoTypes";
import {iuFos, iuPr} from "../G/GAPIs";
import {paSid} from "../G/GHelpers";
import { IconButton} from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import {Cooltip} from "../CommonHelpers/2_CoolTip";
import {getAllDescendants2} from "../G/2_GridContainer/2he";

export const useHandleShortCut = () => {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { fevId, setFevId, cutEvId, setCutEvId, focusTFId, setFocusTFId } = useChildEvStore();
    const { enqueueSnackbar } = useSnackbar();
    const { filterEvs, markEvs } = useTLBaseFgHelpers();
    const { RpxToRh, h$G_BgStart, w$BgStart_spot, getLevelCOf } = useTLBaseBgHelpers();
    const { allPrs, setAllPrs, rowSelectionModel, setRowSelectionModel, readyCuttingRows, setReadyCuttingRows, setRefreshGrid, setLoadingGrid } = useGridContainerStore();
    const { allFos, setAllFos, lastFoId } = useFoStore();  

    const click = () => {
        if (fevId) {
            setFevId(null);
            setFocusTFId(null);
        }
    }
    const deleteEv = async () => {
        if (fevId) {
            // delete
            const newAllEvs = [...allEvs];
            const allDescendants: Ev[] =
                getAllDescendants(newAllEvs, fevId);

            allDescendants.forEach(
                (ev) =>
                    (ev.activeC = sr.active.inActive.c)
            );
            setAllEvs(markEvs(newAllEvs));
            try {
                await Promise.all(
                    allDescendants.map((ev) => iuEv(ev))
                ).then((data: EvsResult[]) => {
                    const failResult = data.find(
                        (r) => !r.options.success
                    );
                    if (!failResult) {
                        enqueueSnackbar(
                            data[0].options.message,
                            { variant: "success" }
                        );
                    } else {
                        enqueueSnackbar(
                            failResult.options.message,
                            { variant: "error" }
                        );
                    }
                });
            } catch {
                enqueueSnackbar("SOMETHING WRONG!", {
                    variant: "error",
                });
            }
        }
    }

    const cutEv = async (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.ctrlKey) {
            if (
                fevId &&
                filterEvs(["childEv"]).filter(
                    (ev) => ev.id === fevId
                ).length > 0
            ) {
                // cut
                setCutEvId(fevId);
            }
        }
    }
    const pasteEv = async (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.ctrlKey) {
            if (cutEvId === null) {
                enqueueSnackbar("Past Fail", {
                    variant: "error",
                });
                return;
            }
            let newAllEvs = [...allEvs];
            const cutEv: Ev = newAllEvs.filter(
                (ev) => ev.id === cutEvId
            )[0];
            const newTimeStart = GhToCDate(
                h$G_BgStart + RpxToRh(w$BgStart_spot())
            );
            const newTimeEnd = addTime(
                newTimeStart,
                0,
                0,
                0,
                cDateToGh(cutEv.timeEnd) -
                    cDateToGh(cutEv.timeStart),
                0
            );
            const parentEv = newAllEvs.filter(
                (ev) => ev.id === fevId
            )[0];
            const h$difference =
                cDateToGh(newTimeStart) -
                cDateToGh(cutEv.timeStart);
            let allDescendants: Ev[] =
                getAllDescendants(newAllEvs, cutEvId);

            // if fevId is parentEv, go on
            if (fevId && parentEv) {
                if (
                    parentEv.levelC !==
                        getLevelCOf("parentEv") ||
                    cutEv.levelC !==
                        getLevelCOf("childEv")
                ) {
                    // we have to separate 2 cases, bcz of this condition
                    enqueueSnackbar("Past Fail", {
                        variant: "error",
                    });
                    return;
                }
                // paste
                else if (cutEvId) {
                    newAllEvs = newAllEvs.map(
                        (_ev: Ev) => {
                            if (_ev.id === cutEvId) {
                                return {
                                    ..._ev,
                                    parentId: fevId,
                                    timeStart:
                                        newTimeStart,
                                    timeEnd: newTimeEnd,
                                };
                            } else if (
                                allDescendants.find(
                                    (e) =>
                                        e.id === _ev.id
                                )
                            ) {
                                return {
                                    ..._ev,
                                    timeStart:
                                        GhToCDate(
                                            cDateToGh(
                                                _ev.timeStart
                                            ) +
                                                h$difference
                                        ),
                                    timeEnd: GhToCDate(
                                        cDateToGh(
                                            _ev.timeEnd
                                        ) + h$difference
                                    ),
                                };
                            }
                            return _ev;
                        }
                    );
                }
            } else if (
                fevId === null ||
                fevId === 999999999
            ) {
                // paste
                newAllEvs = newAllEvs.map((_ev: Ev) => {
                    if (_ev.id === cutEvId) {
                        return {
                            ..._ev,
                            parentId: null,
                            timeStart: newTimeStart,
                            timeEnd: newTimeEnd,
                        };
                    } else if (
                        allDescendants.find(
                            (e) => e.id === _ev.id
                        )
                    ) {
                        return {
                            ..._ev,
                            timeStart: GhToCDate(
                                cDateToGh(
                                    _ev.timeStart
                                ) + h$difference
                            ),
                            timeEnd: GhToCDate(
                                cDateToGh(_ev.timeEnd) +
                                    h$difference
                            ),
                        };
                    }
                    return _ev;
                });
            }

            setAllEvs(markEvs(newAllEvs));
            allDescendants = getAllDescendants(
                newAllEvs,
                cutEvId
            );
            await Promise.all(
                allDescendants.map((ev) =>
                    iuEv({
                        ...ev,
                        timeStart: cDateToUTCDate(
                            ev.timeStart
                        ),
                        timeEnd: cDateToUTCDate(
                            ev.timeEnd
                        ),
                    })
                )
            ).then((data: EvsResult[]) => {
                const failResult = data.find(
                    (r) => !r.options.success
                );
                if (!failResult) {
                    setCutEvId(null);
                    enqueueSnackbar(
                        data[0].options.message,
                        { variant: "success" }
                    );
                } else {
                    enqueueSnackbar(
                        failResult.options.message,
                        { variant: "error" }
                    );
                }
            });
        }
    };

    type RevertBtnMProps = {
        srcFoId: string;
        srcCuttingRows: string[];
    }
    const RevertBtnM = (props: RevertBtnMProps) => <Cooltip title="Revert" content="Revert" >
        <IconButton aria-label="Revert" size="small" 
            onClick={
                async () => {
                    const {srcFoId, srcCuttingRows} = props;
                    setLoadingGrid(true);
                    const readyPrs = deepClone(allPrs.filter((pr) => srcCuttingRows.includes(pr.id)));
                    const readyFos :Fo[] = deepClone(allFos.filter((fo) => srcCuttingRows.includes(fo.id)));
                    readyPrs.forEach((pr:any) => {
                        pr.parentId = srcFoId; 
                        pr.pesults = JSON.stringify(pr.pesults)});
                    readyFos.forEach(fo => fo.parentId = srcFoId);
            
                    try {
                        await Promise.all(
                            [   ...readyPrs.map((pr:any) => iuPr(pr).then((res:PrsResult) => {return {res: res.options.success, type: g.type.pr}})),
                                ...readyFos.map((fo:any) => iuFos(fo).then((res:PrsResult) => {return {res: res.options.success, type: g.type.fo}}))
                            ])
                        enqueueSnackbar(`Revert ${readyPrs.length+readyFos.length} rows Successfully`, {variant: "success"})
                    }
                    catch  {
                        enqueueSnackbar(`Revert Fail`, {variant: "error"})
                    }
                    finally {
                        setReadyCuttingRows([])
                        setRefreshGrid(true)
                    }
                }}
        >
                <UndoIcon />
            </IconButton>
    </Cooltip>

    const pasteRow = async (e: KeyboardEvent<HTMLDivElement>) => {
        // no row selected, return
        if(readyCuttingRows.length === 0 || lastFoId === null)
            return;
        else {
            // if paste to the same Folder, return
            if (readyCuttingRows.length === 0 || lastFoId === null)
                return;


            var firstRow: any;
            const x =  paSid(readyCuttingRows[0] as string).type;
            if(x === g.type.pr) 
                firstRow = allPrs.find((pr) => pr.id === readyCuttingRows[0])
            else if(x === g.type.fo) 
                firstRow = allFos.find((fo) => fo.id === readyCuttingRows[0]);

            // if paste to the same Folder, return
            if(firstRow?.parentId === lastFoId) {
                enqueueSnackbar(`Source and Destination is the same`, {variant: 'warning'})
                setReadyCuttingRows([]);
                return;
            }

            // if paste to child, return
            const readyPrs = deepClone(allPrs.filter((pr) => readyCuttingRows.includes(pr.id)));
            const readyFos :Fo[] = deepClone(allFos.filter((fo) => readyCuttingRows.includes(fo.id)));
            if(readyPrs.find((pr:any) => pr.id === lastFoId) || readyFos.find((fo:any) => fo.id === lastFoId)) {
                enqueueSnackbar(`Can not paste to child`, {variant: 'warning'})
                setReadyCuttingRows([]);
                return
            }
            else {
                // GO
                if (e.ctrlKey) {
                    setLoadingGrid(true);
                    let srcFoId = firstRow?.parentId;
                    readyFos.forEach(fo => fo.parentId = lastFoId);
                    readyPrs.forEach((pr:any) => {
                        pr.parentId = lastFoId;
                        pr.pesults = JSON.stringify(pr.pesults)});
        
                    try {
                        await Promise.all(
                            [   ...readyPrs.map((pr:any) => iuPr(pr).then((res:PrsResult) => {return {res: res.options.success, type: g.type.pr}})),
                                ...readyFos.map((fo:any) => iuFos(fo).then((res:PrsResult) => {return {res: res.options.success, type: g.type.fo}}))
                            ]
                        )
                        // if there is any fail, it jump to catch imediately
                        enqueueSnackbar(`Moved ${readyFos.length + readyPrs.length} rows successfully `,
                            {   
                                variant: "success", autoHideDuration: 5000,
                                action: (key) => (<RevertBtnM srcFoId={srcFoId as string} srcCuttingRows={readyCuttingRows as string[]} />),
                            })
                    }
                    catch (error) {
                        console.log(error)
                        enqueueSnackbar(`Moved Fail: ${JSON.stringify(error)}`, {
                            variant: "error", autoHideDuration: 5000,
                            action: (key) => (<RevertBtnM srcFoId={srcFoId as string} srcCuttingRows={readyCuttingRows as string[]} />)
                        })
                    }
                    finally {
                        setReadyCuttingRows([])
                        setRefreshGrid(true)
                    }
                }
            }
        }

    }

    const cutRow = async (e: KeyboardEvent<HTMLDivElement>) => {
        setReadyCuttingRows(rowSelectionModel);
    }

    type RevertBtnDProps = {
        srcSelectionModel: string[];
    }
    const RevertBtnD = (props: RevertBtnDProps) => <Cooltip title="Revert" content="Revert" >
        <IconButton aria-label="Revert" size="small" 
            onClick={
                async () => {
                    const {srcSelectionModel} = props;
                    setLoadingGrid(true);
                    const prIds = srcSelectionModel.filter((id) => paSid(id as string).type === g.type.pr);
                    const foIds = srcSelectionModel.filter((id) => paSid(id as string).type === g.type.fo);
                    const readyPrs: Pr[] = deepClone(allPrs.filter((pr) => prIds.includes(pr.id)))
                    let readyFos: Fo[] = []
                    const readyFos0: Fo[] = deepClone(allFos.filter((fo) => foIds.includes(fo.id)))
                    readyFos0.forEach((fo) => {readyFos = deepClone([...readyFos, ...getAllDescendants2(allFos, fo.id, true) as Fo[]])})
                    
                    readyFos.forEach(fo => fo.activeC = "Act");
                    readyPrs.forEach((pr:any) => {
                        pr.activeC = "Act";
                        pr.pesults = JSON.stringify(pr.pesults);
                    });
            
                    try {
                        await Promise.all(
                            [   ...readyPrs.map((pr:any) => iuPr(pr).then((res:PrsResult) => {return {res: res.options.success, type: g.type.pr}})),
                                ...readyFos.map((fo:any) => iuFos(fo).then((res:PrsResult) => {return {res: res.options.success, type: g.type.fo}}))
                            ])
                        enqueueSnackbar(`Revert ${readyPrs.length+readyFos.length} rows Successfully`, {variant: "success"})
                    }
                    catch  {
                        enqueueSnackbar(`Revert Fail`, {variant: "error"})
                    }
                    finally {
                        setRowSelectionModel([])
                        setRefreshGrid(true)
                    }
                }}
        >
                <UndoIcon />
            </IconButton>
    </Cooltip>
    const deleteRows = async (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        const prIds = rowSelectionModel.filter((id) => paSid(id as string).type === g.type.pr);
        const foIds = rowSelectionModel.filter((id) => paSid(id as string).type === g.type.fo);
        const readyPrs: Pr[] = deepClone(allPrs.filter((pr) => prIds.includes(pr.id)))
        let readyFos: Fo[] = []
        const readyFos0: Fo[] = deepClone(allFos.filter((fo) => foIds.includes(fo.id)))
        readyFos0.forEach((fo) => {readyFos = deepClone([...readyFos, ...getAllDescendants2(allFos, fo.id, true) as Fo[]])})

        readyFos.forEach(fo => fo.activeC = "InAct");
        readyPrs.forEach((pr:any) => {
            pr.activeC = "InAct";
            pr.pesults = JSON.stringify(pr.pesults);
        });
        console.log(readyPrs)

        try {
            await Promise.all(
                [   ...readyPrs.map((pr:any) => iuPr(pr).then((res:PrsResult) => {return {res: res.options.success, type: g.type.pr}})),
                    ...readyFos.map((fo:any) => iuFos(fo).then((res:PrsResult) => {return {res: res.options.success, type: g.type.fo}}))
                ])

            // if there is any fail, it jump to catch imediately
            enqueueSnackbar(
                `Delete ${readyFos.length + readyPrs.length} rows successfully `, {   
                    variant: "success", autoHideDuration: 5000,
                    action: (key) => (<RevertBtnD srcSelectionModel={rowSelectionModel as string[]} />),
            })
        }
        catch (error) {
            console.log(error)
            enqueueSnackbar(`Delete Fail: ${JSON.stringify(error)}`, {
                variant: "error", autoHideDuration: 5000,
                action: (key) => (<RevertBtnD srcSelectionModel={rowSelectionModel as string[]} />),
            })
        }
        finally {
            setRowSelectionModel([])
            setRefreshGrid(true)
        }
    }

    return {
        click,

        deleteEv,
        cutEv,
        pasteEv,

        pasteRow,
        cutRow,
        deleteRows

    };
};
