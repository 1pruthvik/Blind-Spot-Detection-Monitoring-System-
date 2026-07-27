import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { AccessTimeFilled, Radar, Straighten, Sensors } from "@mui/icons-material";

const AnimatedMetric = ({ value, label, icon, suffix = "", color }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const startValue = 0;
        const targetValue = Number(value);
        const duration = 700;
        const startTime = performance.now();

        let frameId;

        const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (targetValue - startValue) * eased;
            setDisplayValue(currentValue);

            if (progress < 1) {
                frameId = window.requestAnimationFrame(animate);
            }
        };

        frameId = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(frameId);
    }, [value]);

    const formatValue = (num) => {
        if (Number.isInteger(num)) {
            return `${num}${suffix}`;
        }
        return `${num.toFixed(1)}${suffix}`;
    };

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 3,
                boxShadow: "0 12px 32px rgba(2, 6, 23, 0.25)"
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                        {label}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            bgcolor: `${color}22`,
                            color
                        }}
                    >
                        {icon}
                    </Box>
                </Stack>
                <Typography variant="h4" fontWeight={700} sx={{ color: "white" }}>
                    {formatValue(displayValue)}
                </Typography>
            </CardContent>
        </Card>
    );
};

const AnalyticsCards = ({ averageDistance, nearestObject, objectsDetected, uptime }) => {
    const cards = [
        { label: "Average Distance", value: averageDistance, icon: <Straighten />, color: "#2563eb", suffix: " cm" },
        { label: "Nearest Object", value: nearestObject, icon: <Radar />, color: "#22c55e", suffix: " cm" },
        { label: "Objects Detected", value: objectsDetected, icon: <Sensors />, color: "#f59e0b", suffix: "" },
        { label: "System Uptime", value: uptime, icon: <AccessTimeFilled />, color: "#ef4444", suffix: "h" }
    ];

    return (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" } }}>
            {cards.map((card) => (
                <AnimatedMetric
                    key={card.label}
                    value={card.value}
                    label={card.label}
                    icon={card.icon}
                    suffix={card.suffix}
                    color={card.color}
                />
            ))}
        </Box>
    );
};

export default AnalyticsCards;
