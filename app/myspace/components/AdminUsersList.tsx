import * as React from "react";
import Box from "@mui/material/Box";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {Add, Close, Delete, Edit, Password, Preview,} from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
    Switch,
    Typography,
} from "@mui/material";
import {axiosApi, formatDateTime, showInformation} from "components/utilis";
import MyDialog from "components/MyDialog";
import ContactUs from "components/ContactUs";
import LoadingPage from "app/LoadingPage";
import AddAccount from "../../account/components/AddAccount";
import UpdatePassword from "../../account/components/UpdatePassword";
import {useSelector} from "react-redux";
import {RootState} from "../../../lib/store";

const StyledGridOverlay = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
        fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
        fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
        fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
        fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
        fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
        fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
}));

export function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                style={{flexShrink: 0}}
                width="240"
                height="200"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"/>
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"/>
                    </g>
                </g>
            </svg>
            <Box sx={{mt: 1}}>No Rows</Box>
        </StyledGridOverlay>
    );
}

export default function AdminUsersList() {
    const columns: GridColDef<any>[] = [
        {
            align: "left",
            display: "flex",
            field: "avatar",
            headerName: "Avatar",
            width: 60,
            renderCell: (value) => (
                <Avatar
                    src={`${process.env.NEXT_PUBLIC_ONLINE_WS_URI}/images/profiles/${value?.value}`}
                    sx={{width: "32px", height: "32px"}}
                />
            ),
        },
        {
            field: "firstname",
            headerName: "Firstname",
            width: 120,
            editable: false,
        },
        {
            field: "lastname",
            headerName: "Lastname",
            width: 120,
            editable: false,
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            editable: false,
        },
        {
            field: "role",
            width: 80,
            display: "flex",

            headerName: "Role",
        },
        {
            field: "createdAt",
            headerName: "Created at",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 200,
            valueFormatter: (value) => formatDateTime(value),
            // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        },
        {
            field: "updatedAt",
            headerName: "Updated at",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 200,
            valueFormatter: (value) => formatDateTime(value),
            // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        },
        {
            field: "confirmed",
            align: "center",
            headerName: "Confirmed",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 100,
            renderCell: (value) => <Switch sx={{}} checked={value?.value}/>,
        },

        {
            align: "right",
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 160,
            cellClassName: "actions",
            getActions: ({id, row}: any) => {
                return [
                    <GridActionsCellItem
                        key={"index0"}
                        icon={<Preview/>}
                        label="Preview"
                        onClick={(e) => handleClickOpen(row)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<Password/>}
                        label="Preview"
                        onClick={(e) => handleEditPass(row)}
                        color="inherit"
                        key={"index"}
                    />,
                    <GridActionsCellItem
                        icon={<Edit/>}
                        label="Preview"
                        onClick={(e) => handleEdit(row)}
                        color="inherit"
                        key={"index"}
                    />,
                    <GridActionsCellItem
                        key={"index"}
                        icon={<Delete/>}
                        label="Delete"
                        onClick={() => deletePost(row?.id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    const [posts, setPosts] = React.useState([]);
    const [newPost, setNewPost] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState(0);
    const [openSlug, setOpenSlug] = React.useState<any>("");
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = (slug: string) => {
        setOpenSlug(slug);
        setOpen(true);
    };
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);

    const [loading, setLoading] = React.useState(true);
    const [pagesCount, setPagesCount] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(15);

    React.useEffect(() => {
        const getUsers = async () => {
            setLoading(true);

            await axiosApi
                .get(`/users?page=${currentPage}&size=${pageSize}`, {})
                .then((reponse) => reponse.data)
                .then((json) => {
                    console.log(json);
                    setPosts(json.content);
                    setPagesCount(json?.totalPages);
                    //setCurrentPage(0);
                    //setPages(json?.pages);

                    setLoading(false);
                })
                .catch((erro) => {
                    console.log(erro);
                    setLoading(true);
                });
        };
        getUsers();
    }, [setLoading, currentPage,update]);
    const [editUser, setEditUser] = React.useState<any>(null);
    const [updatePass, setUpdatePass] = React.useState<boolean>(false);

    const handleEdit = (user: any) => {
        setEditUser(user);
        setNewPost(true);

    };
    const handleEditPass = (user: any) => {
        setEditUser(user);
        setUpdatePass(true);

    };
    const deletePost = async (slug: any) => {
        await axiosApi
            .delete(`/users/${slug}`)
            .then((reponse) => reponse.data)
            .then((json) => {
                setUpdate(r=>r+1)

                setLoading(false);
            })
            .catch((erro) => {
                console.log(erro);
                setLoading(true);
            });
    };
    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;
    return (
        <Box sx={{height: "100%", width: "100%"}}>
            <div style={{display: "flex", width: "100%", paddingBottom: "10px"}}>
                <Button variant="outlined" onClick={() => {
                    if(loggedAccount.role=="ADMIN")
                    setNewPost(true)
                    else showInformation("you are not admin")
                }}>
                    <Add/> User
                </Button>
            </div>
            <LoadingPage open={loading} onClose={() => setLoading(false)}/>
            <DataGrid
                autoHeight
                rows={posts}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 9,
                        },
                    },
                }}
                slots={{noRowsOverlay: CustomNoRowsOverlay}}
                sx={{"--DataGrid-overlayHeight": "300px", zIndex: 0}}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
            />

            <Dialog maxWidth="md" fullWidth sx={{}} open={open} onClose={handleClose}>
                <DialogTitle
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography fontWeight={600}>{openSlug?.subject}</Typography>{" "}
                    <Typography fontWeight={600}>
                        from : {openSlug?.name} [{openSlug?.email}]
                    </Typography>
                    <IconButton style={{marginRight: 0}} onClick={handleClose}>
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={true} style={{paddingTop: "30px"}}>
                    <Container maxWidth="lg">
            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "tahoma",
                    paddingBottom: "30px",
                }}
            >
              {openSlug?.content}
            </pre>
                        {}
                    </Container>
                </DialogContent>
            </Dialog>
            <MyDialog
                // maxHeight="100vh"
                maxWidth={"md"}
                title={"Account data"}
                open={newPost}
                onClose={() => {

                    setEditUser(null);
                    setNewPost(false);
                }}
            >
                <AddAccount onClose={() => {

                    setEditUser(null);
                    setNewPost(false)
                    setUpdate(r=>r+1)
                }}
                            editUser={editUser}
                />
            </MyDialog>
            <MyDialog
                // maxHeight="100vh"
                maxWidth={"sm"}
                height={"50%"}
                title={"Update password"}
                open={updatePass}
                onClose={() => {

                    setEditUser(null);
                    setUpdatePass(false);
                }}
            >
                <UpdatePassword onClose={() => {

                    setEditUser(null);
                    setUpdatePass(false)
                    setUpdate(r=>r+1)
                }}
                            userId={editUser?.id}
                />
            </MyDialog>
        </Box>
    );
}
