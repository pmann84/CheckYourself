import { AppBar, Box, Toolbar, Typography } from "@mui/material";

function App() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Check Yourself
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default App;
