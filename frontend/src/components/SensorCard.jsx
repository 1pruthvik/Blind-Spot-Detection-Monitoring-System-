import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Grow, Stack, Typography } from "@mui/material";

const SensorCard = ({ title, distance, status }) => {
    const normalizedStatus = (status || "SAFE").toUpperCase();
    const [animate, setAnimate] = useState(true);

    const statusColors = {
        SAFE: { color: "#22c55e", glow: "rgba(34, 197, 94, 0.35)" },
        WARNING: { color: "#f59e0b", glow: "rgba(245, 158, 11, 0.35)" },
        DANGER: { color: "#ef4444", glow: "rgba(239, 68, 68, 0.35)" }
    };

    const activeColor = statusColors[normalizedStatus] || statusColors.SAFE;

    useEffect(() => {
        setAnimate(false);
        const frame = window.requestAnimationFrame(() => setAnimate(true));
        return () => window.cancelAnimationFrame(frame);
    }, [distance, status]);

    return (
        <Grow in={animate} timeout={350}>
            <Card
                elevation={0}
                sx={{
                    height: "100%",
                    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 4,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: "0 10px 30px rgba(2, 6, 23, 0.25)",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)"
                    }
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight={600} sx={{ color: "white" }}>
                            {title}
                        </Typography>
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                bgcolor: activeColor.color,
                                boxShadow: `0 0 18px ${activeColor.glow}`
                            }}
                        />
                    </Stack>

                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
                        Distance
                    </Typography>
                    <Typography variant="h3" fontWeight={800} sx={{ color: "white", mb: 2 }}>
                        {distance} cm
                    </Typography>

                    <Chip
                        label={normalizedStatus}
                        sx={{
                            bgcolor: `${activeColor.color}22`,
                            color: activeColor.color,
                            fontWeight: 700,
                            border: `1px solid ${activeColor.color}55`,
                            borderRadius: "999px"
                        }}
                    />
                </CardContent>
            </Card>
        </Grow>
    );
};

export default SensorCard;
