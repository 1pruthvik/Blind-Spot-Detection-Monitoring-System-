import React from "react";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { DirectionsCar } from "@mui/icons-material";

const Navbar = () => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)"
            }}
        >
            <Toolbar sx={{ py: 1.2, justifyContent: "space-between" }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                        sx={{
                            bgcolor: "primary.main",
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <DirectionsCar sx={{ color: "white", fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ color: "white", lineHeight: 1.1 }}>
                            Blind Spot Detection System
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                            Real-Time Vehicle Monitoring Dashboard
                        </Typography>
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
