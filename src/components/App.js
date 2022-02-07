import React from "react";

import { Box } from "@mui/material";

import { themeDark } from "../Theme.js";
import CssBaseline from "@mui/material/CssBaseline";

import ResponsiveAppBar from "./ResponsiveAppBar.js";
import ProtectRoute from "./ProtectRoute.js";
import { ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from "../contexts/Auth";

export default function App({ children }) {
    const [theme, setTheme] = React.useState(themeDark);

    return (
        <AuthProvider>
            <ProtectRoute>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box
                        sx={{
                            flex: 1,
                            height: "100%",
                            maxWidth: "100%",
                            maxHeight: "100vh",
                            padding: 0,
                            margin: 0,
                            backgroundColor: "background.default",
                        }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateRows: "64px 1fr",
                                margin: 0,
                                padding: 0,
                                gap: 0,
                                height: "100%",
                                maxWidth: "100%",
                                maxHeight: "100vh",
                            }}
                        >
                            <ResponsiveAppBar
                                theme={theme}
                                setTheme={setTheme}
                                sx={{ gridArea: "header" }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {children}
                            </Box>
                        </Box>
                    </Box>
                </ThemeProvider>
            </ProtectRoute>
        </AuthProvider>
    );
}
