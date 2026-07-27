import React from "react";
import {
    Card,
    CardContent,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

const statusColors = {
    SAFE: "success",
    WARNING: "warning",
    DANGER: "error"
};

const HistoryTable = ({ history }) => {
    const rows = history.slice().reverse().slice(0, 20);

    return (
        <Card
            elevation={0}
            sx={{
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 3,
                boxShadow: "0 12px 32px rgba(2, 6, 23, 0.25)"
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: "white", mb: 2 }}>
                    History Log
                </Typography>
                <TableContainer sx={{ maxHeight: 320, overflow: "auto" }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "rgba(255,255,255,0.7)", bgcolor: "rgba(15, 23, 42, 0.95)" }}>Time</TableCell>
                                <TableCell sx={{ color: "rgba(255,255,255,0.7)", bgcolor: "rgba(15, 23, 42, 0.95)" }}>Sensor A</TableCell>
                                <TableCell sx={{ color: "rgba(255,255,255,0.7)", bgcolor: "rgba(15, 23, 42, 0.95)" }}>Sensor B</TableCell>
                                <TableCell sx={{ color: "rgba(255,255,255,0.7)", bgcolor: "rgba(15, 23, 42, 0.95)" }}>Sensor C</TableCell>
                                <TableCell sx={{ color: "rgba(255,255,255,0.7)", bgcolor: "rgba(15, 23, 42, 0.95)" }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={`${row.Timestamp || index}-${index}`} hover>
                                    <TableCell sx={{ color: "white" }}>{row.Timestamp || "-"}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{row.SensorA ?? "-"}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{row.SensorB ?? "-"}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{row.SensorC ?? "-"}</TableCell>
                                    <TableCell>
                                        <Chip label={row.Status || "SAFE"} color={statusColors[row.Status] || "success"} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default HistoryTable;
