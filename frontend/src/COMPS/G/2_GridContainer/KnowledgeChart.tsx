import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Kesult } from "../10_Rialog/10ty";

type KnowledgeChartProps = {
    kesults: Kesult[];
};



// const data0 = [
//     { id: "0", prId: "Pr-126", time: "2025-02-22T10:01:00", grade: 1, interval: 1, easeFactor: 2.5, repetitions: 0 },
//     { id: "1", prId: "Pr-126", time: "2025-02-23T10:07:00", grade: 2, interval: 1, easeFactor: 2.5, repetitions: 0 },
//     { id: "2", prId: "Pr-126", time: "2025-02-25T10:17:00", grade: 3, interval: 1, easeFactor: 2.5, repetitions: 0 },
//     { id: "3", prId: "Pr-126", time: "2025-02-28T10:51:00", grade: 4, interval: 1, easeFactor: 2.3, repetitions: 0 },
//     { id: "4", prId: "Pr-126", time: "2025-03-01T10:51:00", grade: 5, interval: 1, easeFactor: 2.3, repetitions: 0 },
// ];

const getGradeAndDateArr = (data: Kesult[]) => {
    if (!data.length) return { dateArray: [], gradeArray: [] };

    // Lấy năm từ item cuối cùng
    const lastYear = new Date(data[data.length - 1].time).getFullYear();

    // Xác định khoảng ngày từ 01/01 đến 31/12 của năm đó
    const startDate = new Date(lastYear, 0, 1); // 1/1 của năm cuối cùng
    const endDate = new Date(lastYear, 2, 31); // 31/12 của năm cuối cùng

    // Tạo object lookup để tra cứu grade nhanh
    const resultMap: Record<string, number> = {};
    data.forEach((item) => {
        const date = new Date(item.time).toISOString().split("T")[0]; // Lấy YYYY-MM-DD
        resultMap[date] = item.grade || 0; // Nếu không có grade thì mặc định 0
    });

    // Tạo mảng dateArray & gradeArray
    const dateArray: string[] = [];
    const gradeArray: number[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
        dateArray.push(dateStr);
        gradeArray.push(resultMap[dateStr] || 0); // Nếu không có dữ liệu thì gán 0
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return { dateArray, gradeArray };
};



const KnowledgeChart = (props: KnowledgeChartProps) => {
    const { kesults } = props;
    const { dateArray, gradeArray } = getGradeAndDateArr(kesults as Kesult[])
    const data = dateArray.map((date, index) => ({date: date, grade: gradeArray[index]}))

    const formattedData = data.map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.grade,
        fillColor: item.grade ===0 ? 'white' : (item.grade==1||item.grade===2) ? "#FF0000" : "#008000", // Đỏ nếu grade < 3, xanh nếu >= 3
        
      }));

    const [chartData] = useState({
        series: [
            {
                data: formattedData,
                hide: true,
            },
        ],
        options: {
            chart: {
                // height: "84px",
                type: "scatter",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false, // Ẩn menu toolbar (hamburger button)
                },
                animations: {
                    enabled: false, // Tắt hiệu ứng
                },
            },
            markers: {
                // size: 3, // Kích thước dot
                discrete: gradeArray.map((value, index) => ({
                    seriesIndex: 0,
                    dataPointIndex: index,
                    size: value === 0 ? 0 : 3, // Nếu grade = 0 thì ẩn dot
                    strokeColor: 'none'
                  })),
              },
            //   dataLabels: {
            //     enabled: false,
            //   },
            stroke: {
                curve: "smooth", // Không cần `as "stepline"`
                width: 1,
            },
            //   title: {
            //     text: "Product Trends by Month",
            //     align: "left",
            //   },
            grid: {
                row: {
                    colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
                show: false,
            },
            yaxis: {
                min: 0, // Giới hạn giá trị nhỏ nhất
                max: 5, // Giới hạn giá trị lớn nhất để làm cho đường đồ thị "nằm thấp hơn"
                labels: { show: false }, // Ẩn nhãn trục Y
                axisBorder: { show: false }, // Ẩn đường trục Y
                axisTicks: { show: false }, // Ẩn vạch nhỏ trên trục Y
                tickAmount: 2,
                
            },
            xaxis: {
                categories: dateArray,
                labels: { show: false }, // Ẩn nhãn trục X
                axisBorder: { show: false }, // Ẩn đường trục X
                axisTicks: { show: false }, // Ẩn vạch nhỏ trên trục X
                tickAmount: Math.floor(20 / 4)
            },
            tooltip: {
                enabled: false, // Bật tooltip
                // theme: "dark", // Chọn theme (light, dark, hoặc custom)
                // y: {
                //     formatter: (value: number) => `Grade: ${value}`, // Custom nội dung hiển thị
                    
                // },
                // marker: {
                //     show: true, // Hiển thị chấm màu trong tooltip
                // },
            },
            animations: {  
                enabled: false, // Tắt hiệu ứng
            },
        } as ApexCharts.ApexOptions, // Thêm kiểu `ApexOptions`
    });

    return (
        <div id="chart">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={110}
                style={{ marginTop: "-20px" }}
            />
        </div>
    );
};

export default KnowledgeChart;
