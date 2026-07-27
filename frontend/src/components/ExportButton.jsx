import React from "react";
import { Button } from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";

const ExportButton = ({ history }) => {
    const handleExport = () => {
        const rows = history.length > 0 ? history : [];
        const csvContent = [
            ["Time", "Sensor A", "Sensor B", "Sensor C", "Status"],
            ...rows.map((row) => [row.Timestamp || "", row.SensorA ?? "", row.SensorB ?? "", row.SensorC ?? "", row.Status || ""])
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "blind_spot_history.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="contained"
            startIcon={<DownloadOutlined />}
            onClick={handleExport}
            sx={{
                bgcolor: "primary.main",
                borderRadius: "999px",
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600
            }}
        >
            Export CSV
        </Button>
    );
};

export default ExportButton;
