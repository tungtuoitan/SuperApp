import React, { useState } from "react";
import { useTLBaseStore } from "../TLBase/Store/TLBaseStore";
import { useTLBaseHelpers } from "../TLBase/TLBaseHelpers";
import { _TLL } from "../TLConfigs";


export const MouseTooltip = () => {
    const {position, mili$70_spotlight, ratio, w$TLBaseContent, curL} = useTLBaseStore();
    const {mili$70_TILeft} = useTLBaseHelpers();

  return (
      <div
        style={{
          position: "absolute",
          left: position.x + 10 + 'px', // Cách con chuột 10px theo chiều ngang
          top: position.y + 10 + 'px',  // Cách con chuột 10px theo chiều dọc
          backgroundColor: "gray",
          color: "white",
          padding: "8px",
          fontSize: '11px',
          borderRadius: "5px",
          pointerEvents: "none", // Không bị ảnh hưởng bởi con chuột
          zIndex: 1000,
          textAlign: 'left',
        }}
      >
        <p>
            70_TIleft: {new Date(mili$70_TILeft + ratio.current * w$TLBaseContent.current / (_TLL[curL.TILid].pxPerMili * curL.zoomLv)).toLocaleString()}
        </p>
        {/* <p>
            70_spl: {new Date(mili$70_spotlight.current).toLocaleString()}
        </p> */}
        <p>
            w$TLBaseContent_spotlight: {ratio.current * w$TLBaseContent.current}
        </p> 
        {/* <p>
            ratio: {ratio.current}
        </p>
        <p>
            w$TLBaseContent: {w$TLBaseContent.current}
        </p> */}
        </div>
  );
};

