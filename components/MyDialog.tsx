import {ArrowBack} from "@mui/icons-material";
import {Dialog, DialogContent, DialogTitle, IconButton,} from "@mui/material";
import PropTypes from "prop-types";

interface MyDialogProps {
    open: boolean,
    title:string,
    children:any,
    onClose:any,
    maxWidth:any,
    height?:string,
    options?:any,

}

function MyDialog(props: MyDialogProps) {
    const {title, children, open, onClose, maxWidth, height, options}:MyDialogProps = props;

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth={maxWidth || "md"}
            PaperProps={{
                sx: {
                    backgroundColor: "background.paper",
                    margin: 0,
                    border: "solid 1px background.paper",
                    paddingInline: "-3px",
                    minWidth: "34%",
                    //  minHeight: "95%",


                    height: height ? height : "100vh",
                },
            }}
            // scroll="body"
        >
            <DialogTitle
                sx={{
                    height: "60px",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px",
                    justifyContent: "start",
                }}
            >
                <IconButton onClick={() => onClose()}>
                    <ArrowBack/>
                </IconButton>{title}

            </DialogTitle>
            <DialogContent sx={{paddingInline: "31px", height: '100%'}}>
                {children}
            </DialogContent>

        </Dialog>
    );
}

MyDialog.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
    open: PropTypes.object,
    onClose: PropTypes.func,
    maxWidth: PropTypes.string,
    height: PropTypes.string,
    options: PropTypes.object,
};
export default MyDialog;
