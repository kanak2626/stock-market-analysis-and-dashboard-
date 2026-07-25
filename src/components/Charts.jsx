 import React, { useEffect, useState } from "react";

import { Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { getMarketChartData } from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

function Charts() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    try {
      const data = await getMarketChartData();
      setStocks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading Charts...</h5>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="alert alert-danger">
        Unable to load chart data.
      </div>
    );
  }

  const lineData = {
    labels: stocks.map((item) => item.symbol),

    datasets: [
      {
        label: "Opening Price",
        data: stocks.map((item) => item.open),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Closing Price",
        data: stocks.map((item) => item.close),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: stocks.map((item) => item.symbol),

    datasets: [
      {
        label: "Current Price",

        data: stocks.map((item) => item.close),

        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };

  return (
    <div className="row">

      <div className="col-lg-8 mb-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">
              Market Line Chart
            </h5>

          </div>

          <div className="card-body">

            <Line data={lineData} />

          </div>

        </div>

      </div>

      <div className="col-lg-4 mb-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">
              Market Distribution
            </h5>

          </div>

          <div className="card-body">

            <Pie data={pieData} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Charts;
