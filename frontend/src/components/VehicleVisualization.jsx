import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const VehicleVisualization = ({ leftDistance, rearDistance, rightDistance, status }) => {
    const [activeZone, setActiveZone] = useState(null);

    useEffect(() => {
        setActiveZone("left");
        const timer = window.setTimeout(() => setActiveZone(null), 700);
        return () => window.clearTimeout(timer);
    }, [leftDistance]);

    useEffect(() => {
        setActiveZone("rear");
        const timer = window.setTimeout(() => setActiveZone(null), 700);
        return () => window.clearTimeout(timer);
    }, [rearDistance]);

    useEffect(() => {
        setActiveZone("right");
        const timer = window.setTimeout(() => setActiveZone(null), 700);
        return () => window.clearTimeout(timer);
    }, [rightDistance]);

    const getZoneColor = (distance) => {
        if (distance < 30) return "#ef4444";
        if (distance < 50) return "#f59e0b";
        return "#22c55e";
    };

    const currentStatusColor = status === "DANGER" ? "#ef4444" : status === "WARNING" ? "#f59e0b" : "#22c55e";

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
                    Blind Spot Visualization
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Top-view monitoring zones
                    </Typography>
                    <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: currentStatusColor }} />
                </Stack>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: 360,
                        height: 260,
                        mx: "auto",
                        borderRadius: 4,
                        background: "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.9))",
                        border: "1px solid rgba(255,255,255,0.08)",
                        overflow: "hidden"
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(circle at center, rgba(37,99,235,0.14), transparent 60%)"
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: 140,
                            height: 90,
                            borderRadius: 4,
                            transform: "translate(-50%, -50%)",
                            background: "linear-gradient(135deg, #334155, #0f172a)",
                            boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: 94,
                            height: 54,
                            borderRadius: 3,
                            transform: "translate(-50%, -50%)",
                            background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))"
                        }}
                    />
                    {[
                        { id: "left", left: "18%", top: "50%", distance: leftDistance },
                        { id: "rear", left: "50%", top: "20%", distance: rearDistance },
                        { id: "right", left: "82%", top: "50%", distance: rightDistance }
                    ].map((zone) => {
                        const color = getZoneColor(zone.distance);
                        const isActive = activeZone === zone.id;

                        return (
                            <Box
                                key={zone.id}
                                sx={{
                                    position: "absolute",
                                    left: zone.left,
                                    top: zone.top,
                                    width: 58,
                                    height: 58,
                                    transform: "translate(-50%, -50%)",
                                    borderRadius: "50%",
                                    border: `2px solid ${color}`,
                                    bgcolor: `${color}18`,
                                    boxShadow: isActive ? `0 0 18px ${color}` : "none",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    transform: isActive ? "translate(-50%, -50%) scale(1.08)" : "translate(-50%, -50%) scale(1)"
                                }}
                            />
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};

export default VehicleVisualization;
