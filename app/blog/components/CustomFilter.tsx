import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import {Autocomplete, Chip, createFilterOptions, Grid, TextField,} from "@mui/material";
import {axiosApi, showInformation} from "components/utilis";
import {useDispatch, useSelector} from "react-redux";
import {getAFilters} from "lib/reducers/filtersSlicer";
import {RootState} from "lib/store";

const filter = createFilterOptions();

export const getAllFilters = async () => {
    try {
        const response = await axiosApi
            .get(`/filters`);
        const json = response.data;
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export function CustomSingleFilter(props: any) {
    const {label, placeholder, type, value} = props;
    const [filterValue, setFilterValue] = React.useState<any>(value);
    const [open, toggleOpen] = React.useState(false);


    //const searchKey = new URLSearchParams(search).get("search");
    const filtersList: any =
        useSelector((state: RootState) => state.filtersList)?.filtersList?.filter((r: any) => r.type == "domain") || [];
    const [dialogValue, setDialogValue] = React.useState<any>(
        {
            label: null,
            type: type,
        });

    return (
        <React.Fragment>
            <Autocomplete
                value={filtersList.filter((d: any) => d?.id == filterValue)[0]?.label}

                onChange={(event: any, newValue: any) => {
                    if (typeof newValue === "string") {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {

                            setDialogValue({
                                label: newValue,
                                type: type,
                            });
                            toggleOpen(true);
                        });
                    } else if (newValue && newValue?.inputValue) {

                        setDialogValue({
                            label: newValue?.inputValue,
                            type: type,
                        });
                        toggleOpen(true);
                    } else {
                        setFilterValue(newValue?.id);
                        props?.updateFilter(newValue?.id);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== "") {
                        filtered.push({
                            inputValue: params.inputValue,
                            label: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}

                id="free-solo-dialog-demo"
                options={filtersList}

                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === "string") {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.label;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.label}</li>}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} placeholder={label} label={label}/>
                )}
            />
            <Dialog open={open} onClose={() => toggleOpen(false)}>
                <CustomDialog open={open} onClose={() => toggleOpen(false)} data={dialogValue}/>
            </Dialog>
        </React.Fragment>
    );
}

const CustomDialog = ({open, onClose, data}: any) => {
    const dispatch = useDispatch();
//alert(JSON.stringify(data))
    const [newFilterValue, setNewFilterValue] =
        React.useState<any>(data);

    const [loading, setLoading] = React.useState(false);

    const handleClose = () => {

        onClose()
    };


    const handleSaveNewFilter = () => {
        setLoading(true);
        axiosApi
            .post("/filters/", {
                ...newFilterValue,
            })
            .then(async (data) => {
                showInformation("Add filter successfully ");

                await getAllFilters()
                    .then((data) => {
                        dispatch(getAFilters({data: data}));

                    })

                    .catch((err) => {

                        return err;
                    });
                // dispatch(addNewFilter({data: {label: data.data.label}}));
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false);
                showInformation(JSON.stringify(err.response.data))
                throw err;
            });

        //   setNewPost(empty);
        // setTimeout(() => {
        //   //  alert("ok");
        // }, 7000);
    };
    return <div style={{paddingInline: '10px'}}>


        <DialogTitle>Add a new Filter</DialogTitle>
        <DialogContent style={{display: open ? "" : "none"}}>
            <DialogContentText>

                Did you miss any filter in our list? Please, add it!
            </DialogContentText>

            <Grid
                style={{
                    paddingBlock: "10px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                }}
            >
                {" "}
                <TextField
                    value={newFilterValue.label}
                    onChange={(event) =>
                        setNewFilterValue({
                            ...newFilterValue,
                            label: event.target.value,
                        })
                    }
                    size="small"
                    label="label"
                    placeholder="label"
                    variant="outlined"
                />
                <TextField
                    id="name"
                    value={newFilterValue.type}
                    onChange={(event) =>
                        setNewFilterValue({
                            ...newFilterValue,
                            type: event.target.value,
                        })
                    }
                    size="small"
                    label="type"
                    placeholder="type: 'domain|tags|...'"
                    type="text"
                    variant="outlined"
                />
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={loading}
                    onClick={() => {
                        handleSaveNewFilter();
                    }}
            >
                Save
            </Button>
        </DialogActions>
    </div>

}

export function CustomMultipleFilter(props: any) {
    const {label, placeholder, type, value} = props;
    const [filterValue, setFilterValue] = React.useState<any>(value || []);
    const [dialogValue, setDialogValue] = React.useState<any>({
        label: null,

        type: type,
    });

    const filtersList =
        useSelector((state: RootState) => state.filtersList)?.filtersList?.filter((r: any) => r.type == "tags") || [];
    const [open, toggleOpen] = React.useState(false);


    return (
        <React.Fragment>
            <Autocomplete
                autoFocus
                autoHighlight
                value={filtersList.filter((d: any) => filterValue.includes(d?.id))}
                onChange={(event, newValue: any) => {
                    if (newValue && newValue?.some((d: any) => d?.inputValue != null)) {

                        setDialogValue({
                            label: newValue[0]?.inputValue,
                            type: type,
                        });
                        toggleOpen(true);
                    } else {
                        setFilterValue(newValue?.map((e: any) => e?.id));
                        props?.updateFilter(newValue?.map((e: any) => e?.id));
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== "") {
                        filtered.push({
                            inputValue: params.inputValue,
                            label: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demdo"
                options={filtersList}
                renderTags={(value, getTagProps) =>
                    value.map((option, index: number) => (
                        <Chip
                            variant="outlined"
                            label={option?.inputValue ? option?.inputValue : option?.label}
                            key={index}
                        />
                    ))
                }
                clearOnBlur
                disableCloseOnSelect
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.label}</li>}
                // sx={{ width: 300 }}
                freeSolo
                multiple
                renderInput={(params) => (
                    <TextField {...params} placeholder={label} label={label}/>
                )}
            />
            <Dialog open={open} onClose={() => toggleOpen(false)}>
                <CustomDialog open={open} onClose={() => toggleOpen(false)} data={dialogValue}/>
            </Dialog>
        </React.Fragment>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
