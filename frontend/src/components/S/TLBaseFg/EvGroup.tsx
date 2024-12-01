import { Ev } from "../TLTypes";
import { useTLBaseFgHelpers } from "./TLBaseFgHelpers";
import { useDroppable } from "@dnd-kit/core";
import { Evc } from "./Evc";

type EvGroupProps = {
    groupId: string; // tức id TI, mỗi groupEvs tương ứng với 1 TI lớn
    groupEvs: Ev[];
}
export const EvGroup = (props: EvGroupProps) => {
    const { groupId, groupEvs } = props;
    const { getFiveLines } = useTLBaseFgHelpers();
    const { setNodeRef } = useDroppable({ id: groupId });

    const fiveLines = getFiveLines(groupEvs);

    // data flow: allEvs --> filterEvs --> allGroups --> fiveLines --> renderEv --> Evc
    return (
        <div
            id={'EvGroup-' + groupId}
            ref={setNodeRef}
            style={{
                width: '100%',
                height: 100,
                flexDirection: 'column',
                background: '#00000010',
                gap: 1,
                zIndex: 100,
                position: 'relative',
                marginBottom: 10,
            }}>
                {fiveLines[0]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={0}/>)}
                {fiveLines[1]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={1}/>)}
                {fiveLines[2]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={2}/>)}
                {fiveLines[3]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={3}/>)}
                {fiveLines[4]?.map((ev: Ev, i) => <Evc key={ev.id} ev={ev} lineOrder={4}/>)}
        </div>
    );
}