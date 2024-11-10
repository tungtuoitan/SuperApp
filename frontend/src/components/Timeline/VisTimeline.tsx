import React, { useEffect, useRef } from 'react';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';

const VisTimeline = () => {
  // Sử dụng useRef để tạo tham chiếu đến phần tử DOM chứa timeline
  const timelineRef = useRef(null);
  
  useEffect(() => {
    // Dữ liệu mẫu cho timeline
    const items = [
      { id: 1, content: 'Item 1', start: '2023-04-20' },
      { id: 2, content: 'Item 2', start: '2023-04-22' },
      { id: 3, content: 'Item 3', start: '2023-04-25' },
    ];
    
    // Tạo timeline nếu timelineRef đã gán vào phần tử DOM
    if (timelineRef.current) {
      const timeline = new Timeline(timelineRef.current, items, { /* options */ });
      // Cleanup timeline khi component unmount
      return () => timeline.destroy();
    }
  }, []);
  
  return (
  <div ref={timelineRef} 
       style={{ height: '100%',
        width: '100%',
        // border: '4px solid green',
        }}>

  </div>)
};

export default VisTimeline;
