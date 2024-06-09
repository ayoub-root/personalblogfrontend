import {Backdrop, CircularProgress} from "@mui/material";

export default function LoadingPage({
                                        open,
                                        onClose,
                                    }: {
    open: any;
    onClose: any;
}) {
    const handleClose = () => {
        if (onClose) onClose();
    };

    return (
        <div style={{position: "absolute"}} onClick={handleClose}>
            <Backdrop sx={{color: "#fff", zIndex: 1}} open={open}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}
