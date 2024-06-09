// pages/forbidden.js
import {ArrowBack} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import Link from "next/link";
import React from "react";

const Forbidden = () => {
    return (
        <div
            style={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "solid",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    //  marginBottom: "-45px",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    top: 35,
                    left: 35,
                    background: "background.dialog",
                    // border: "solid",
                    //   width: "115%",
                }}
            >
                <Link href="/">
                    <IconButton>
                        <ArrowBack/>
                    </IconButton>
                </Link>
            </div>
            {" "}
            <h1>403 Forbidden</h1>
            <p>You are not authorized to access this page.</p>
        </div>
    );
};

export default Forbidden;
