import { Box, CircularProgress, Typography } from "@mui/material";

export default function ({message}) {

    return (
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "90vh",
                    padding: "10px",
                }}
            >
                <CircularProgress
                    size="200px"
                    thickness={10}
                    sx={{
                        // width: "100px",
                        color: "primary.main",
                    }}
                />
                <Typography variant="h3" mt="20px" sx={{
                    fontStyle: "italic",
                    color: "primary.main",
                }}>
                    {message}
                </Typography>
            </Box>
        </Box>
    );
}
