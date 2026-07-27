import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ErrorOutlineRounded, ShieldOutlined, WarningAmberRounded } from "@mui/icons-material";

const StatusCard = ({ status }) => {
    const normalizedStatus = (status || "DANGER").toUpperCase();

    const statusConfig = {
        SAFE: {
            color: "#22c55e",
            background: "rgba(34, 197, 94, 0.15)",
            icon: <ShieldOutlined sx={{ fontSize: 40 }} />,
            description: "All sensors are operating normally and no obstruction is detected."
        },
        WARNING: {
            color: "#f59e0b",
            background: "rgba(245, 158, 11, 0.15)",
            icon: <WarningAmberRounded sx={{ fontSize: 40 }} />,
            description: "A potential obstacle is approaching the vehicle perimeter."
        },
        DANGER: {
            color: "#ef4444",
            background: "rgba(239, 68, 68, 0.15)",
            icon: <ErrorOutlineRounded sx={{ fontSize: 40 }} />,
            description: "Object detected inside the blind spot."
        }
    };

    const activeConfig = statusConfig[normalizedStatus] || statusConfig.DANGER;

    return (
        <Card
            elevation={0}
            sx={{
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(2, 6, 23, 0.25)"
            }}
        >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ xs: "flex-start", md: "center" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 84,
                            height: 84,
                            borderRadius: 3,
                            background: activeConfig.background,
                            color: activeConfig.color
                        }}
                    >
                        {activeConfig.icon}
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.22em" }}>
                            Vehicle Status
                        </Typography>
                        <Typography variant="h2" fontWeight={800} sx={{ color: activeConfig.color, mb: 1 }}>
                            {normalizedStatus}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)" }}>
                            {activeConfig.description}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default StatusCard;
