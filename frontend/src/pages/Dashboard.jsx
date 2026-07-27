import React, { useEffect, useState } from "react";
import { Alert, Box, Chip, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import SensorCard from "../components/SensorCard";
import StatusCard from "../components/StatusCard";
import AnalyticsCards from "../components/AnalyticsCards";
import LiveChart from "../components/LiveChart";
import HistoryTable from "../components/HistoryTable";
import VehicleVisualization from "../components/VehicleVisualization";
import NotificationPanel from "../components/NotificationPanel";
import CloudStatus from "../components/CloudStatus";
import ExportButton from "../components/ExportButton";
import { getHistory } from "../services/api";
import { connect, disconnect, onClose, onMessage, onOpen } from "../services/websocket";

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("Connecting");

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "info"
    });
    const [previousStatus, setPreviousStatus] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getHistory();

                console.log("History from backend:", data);


                if (Array.isArray(data)) {
                    setHistory(data);
                    console.log("After setHistory:", data);

                    if (data.length > 0) {
                        setPreviousStatus(data[data.length - 1].Status);
                    }
                } else {
                    setHistory([]);
                }

            } catch (err) {
                console.error(err);
                setError("Unable to connect to backend.");
                setHistory([]);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
        connect();

        const unsubscribeMessage = onMessage((payload) => {
            try {
                const nextReading = typeof payload === "string" ? JSON.parse(payload) : payload;
                setHistory((previous) => {
                    const updated = [...previous, nextReading];

                    updated.sort(
                        (a, b) =>
                            new Date(a.Timestamp).getTime() -
                            new Date(b.Timestamp).getTime()
                    );

                    return updated.slice(-30);
                });
                const status = nextReading.Status;
                if (previousStatus && status !== previousStatus) {
                    setNotification({
                        open: true,
                        message: `Status changed to ${status}`,
                        severity: status === "DANGER" ? "error" : status === "WARNING" ? "warning" : "success"
                    });
                }
                setPreviousStatus(status);
            } catch (err) {
                setError("Unable to process incoming sensor data.");
            }
        });

        const unsubscribeOpen = onOpen(() => {
            setConnectionStatus("Live");
            setError("");
        });

        const unsubscribeClose = onClose(() => {
            setConnectionStatus("Disconnected");
        });

        return () => {
            unsubscribeMessage();
            unsubscribeOpen();
            unsubscribeClose();
            disconnect();
        };
    }, []);

    console.log("History State:", history);

    const latestReading =
        history && history.length > 0
            ? history[history.length - 1]
            : null;

    console.log("Latest Reading:", latestReading);



    const sensors = latestReading
        ? [
            { title: "Sensor A", distance: latestReading.SensorA, status: latestReading.Status },
            { title: "Sensor B", distance: latestReading.SensorB, status: latestReading.Status },
            { title: "Sensor C", distance: latestReading.SensorC, status: latestReading.Status }
        ]
        : [];

    const averageDistance = history.length > 0
        ? ((history.reduce((sum, item) => sum + Number(item.SensorA || 0), 0) + history.reduce((sum, item) => sum + Number(item.SensorB || 0), 0) + history.reduce((sum, item) => sum + Number(item.SensorC || 0), 0)) / (history.length * 3)).toFixed(1)
        : 0;

    const nearestObject = history.length > 0
        ? Math.min(...history.map((item) => Math.min(Number(item.SensorA || 0), Number(item.SensorB || 0), Number(item.SensorC || 0))))
        : 0;

    const objectsDetected = history.filter((item) => item.Status === "DANGER").length;
    const uptime = 24;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
                color: "white",
                pb: 6
            }}
        >
            <Navbar />

            <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
                <Box textAlign="center" mb={5}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: "0.04em",
                            mb: 1,
                            fontSize: { xs: "2rem", md: "3rem" }
                        }}
                    >
                        Blind Spot Monitoring
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "rgba(255,255,255,0.7)",
                            maxWidth: 680,
                            mx: "auto"
                        }}
                    >
                        Advanced situational awareness for safe lane changes and obstacle detection.
                    </Typography>
                </Box>

                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" mb={3} spacing={2}>
                    <Chip
                        label={connectionStatus}
                        color={connectionStatus === "Live" ? "success" : "error"}
                        sx={{ px: 1, fontWeight: 700, borderRadius: "999px" }}
                    />
                    <ExportButton history={history} />
                </Stack>

                {loading && (
                    <Box display="flex" justifyContent="center" mb={4}>
                        <CircularProgress sx={{ color: "primary.main" }} />
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 4, maxWidth: 960, mx: "auto" }}>
                        {error}
                    </Alert>
                )}

                {!loading && !error && sensors.length === 0 && (
                    <Typography variant="h6" sx={{ textAlign: "center", color: "rgba(255,255,255,0.8)" }}>
                        No sensor readings available.
                    </Typography>
                )}

                {!loading && !error && sensors.length > 0 && (
                    <>
                        <Grid container spacing={3} mb={3}>
                            {sensors.map((sensor) => (
                                <Grid item xs={12} md={4} key={sensor.title}>
                                    <SensorCard title={sensor.title} distance={sensor.distance} status={sensor.status} />
                                </Grid>
                            ))}
                        </Grid>

                        <Grid container justifyContent="center" mb={3}>
                            <Grid item xs={12} md={10}>
                                <StatusCard status={latestReading.Status} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} mb={3}>
                            <Grid item xs={12}>
                                <AnalyticsCards
                                    averageDistance={averageDistance}
                                    nearestObject={nearestObject}
                                    objectsDetected={objectsDetected}
                                    uptime={uptime}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} mb={3}>
                            <Grid item xs={12} lg={8}>
                                <LiveChart history={history} />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Stack spacing={3}>
                                    <CloudStatus />
                                    <VehicleVisualization
                                        leftDistance={latestReading.SensorA}
                                        rearDistance={latestReading.SensorB}
                                        rightDistance={latestReading.SensorC}
                                        status={latestReading.Status}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={8}>
                                <HistoryTable history={history} />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Box sx={{ height: "100%" }}>
                                    <NotificationPanel
                                        open={notification.open}
                                        message={notification.message}
                                        severity={notification.severity}
                                        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Dashboard;
