"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Blog() {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" component="h1" sx={{mb: 2}}>
                    post detils page
                </Typography>
            </Box>
        </Container>
    );
}
