import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { CloudDoneOutlined } from "@mui/icons-material";

const CloudStatus = () => {
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
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "rgba(34, 197, 94, 0.15)",
                            color: "#22c55e"
                        }}
                    >
                        <CloudDoneOutlined />
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                            Cloud Sync
                        </Typography>
                        <Typography variant="h6" fontWeight={600} sx={{ color: "white" }}>
                            Connected
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default CloudStatus;
