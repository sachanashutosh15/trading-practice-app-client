import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

export default function LineChart(props) {
  const { stockSymbol } = props;
  const [ intraDayData, setIntraDayData ] = useState({
    priceArr: [],
    timeArr: [],
    renderedIndices: {
      start: 0,
      end: 100
    }
  });

  const intraDayDataUrl = `http://localhost:5000/getEquityIntraDayInfo/${stockSymbol}`;

  useEffect(() => {
    if(stockSymbol) {
      fetch(intraDayDataUrl).then(res => {
        res.json()
        .then(result => {
          setIntraDayData({
            priceArr: result.data.grapthData.map((info) => info[1]),
            timeArr: result.data.grapthData.map(info => info[0])
          })    
        })
      })
    }
  }, [stockSymbol])

  // const labels = ["January", "February", "March", "April", "May", "June"];
  let start = intraDayData.renderedIndices?.start ?? 0;
  let end = intraDayData.renderedIndices?.end ?? 100;
  const labels = intraDayData?.timeArr.slice(start, end) ?? [];
  const renderedData = intraDayData?.priceArr.slice(start, end) ?? []

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${stockSymbol}`,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: renderedData,
        fill: false
      },
      {
        label: `${stockSymbol}-test`,
        backgroundColor: "#333",
        borderColor: "#333",
        data: intraDayData?.priceArr.slice(start + 100, end + 100),
        fill: false
      },
    ]
  };

  const options = {
    scales: {
      x: {
          ticks: {
              display: false
          }
      },
      y: {
        min: Math.min(...renderedData) - 0.2,
        max: Math.max(...renderedData) + 0.2
      }
    },
  }

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
      <div className="chart-controller">
        {/* <IonIcon icon="heart" /> */}
      </div>
    </div>
  );
};