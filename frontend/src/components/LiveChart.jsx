import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography
} from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LiveChart = ({ history }) => {
    const chartData = {
        labels: history.slice(-30).map((entry) => entry.Timestamp || ""),
        datasets: [
            {
                label: "Sensor A",
                data: history.slice(-30).map((entry) => Number(entry.SensorA) || 0),
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.2)",
                tension: 0.4,
                pointRadius: 2
            },
            {
                label: "Sensor B",
                data: history.slice(-30).map((entry) => Number(entry.SensorB) || 0),
                borderColor: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                tension: 0.4,
                pointRadius: 2
            },
            {
                label: "Sensor C",
                data: history.slice(-30).map((entry) => Number(entry.SensorC) || 0),
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                tension: 0.4,
                pointRadius: 2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: "rgba(255,255,255,0.8)" }
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw} cm`
                }
            }
        },
        scales: {
            x: {
                ticks: { color: "rgba(255,255,255,0.7)" },
                grid: { color: "rgba(255,255,255,0.08)" }
            },
            y: {
                ticks: { color: "rgba(255,255,255,0.7)" },
                grid: { color: "rgba(255,255,255,0.08)" }
            }
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 3,
                boxShadow: "0 12px 32px rgba(2, 6, 23, 0.25)",
                height: "100%"
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: "white", mb: 2 }}>
                    Live Distance Chart
                </Typography>
                <Box sx={{ height: 280 }}>
                    <Line data={chartData} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default LiveChart;
