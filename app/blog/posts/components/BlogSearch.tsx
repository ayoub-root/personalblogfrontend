import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import {debounce} from '@mui/material/utils';
import {axiosApi} from "../../../../components/utilis";
import {CircularProgress, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

import {Search} from "@mui/icons-material";

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}


interface PostType {
    title: string;
    slug: string;
    image: string;

}

export default function BlogSearch() {
    const [value, setValue] = React.useState<PostType | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly PostType[]>([]);
    const [loading, setLoading] = React.useState(false)
    const fetch = React.useMemo(
        () =>
            debounce(
                async (request: { input: string }, callback: (results?: readonly PostType[]) => void) => {
                    try {
                        setLoading(true);
                        const response = await axiosApi.post(`/posts/search`, {title: request.input});
                        // alert(JSON.stringify(response.data))
                        callback(response.data);
                        setLoading(false);
                    } catch (error) {
                        console.error('Error fetching posts:', error);
                        callback([]);
                        setLoading(false);
                    }
                },
                400
            ),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({input: inputValue}, (results?: readonly PostType[]) => {
            if (active) {
                let newOptions: readonly PostType[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    // @ts-ignore
    return (
        <Autocomplete
            freeSolo
            sx={{width: 300}}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.title
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No posts"
            onChange={(event: any, newValue: any) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(null);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }} loading={loading}
            renderInput={(params) => (
                <TextField {...params} placeholder="Search blog posts" fullWidth InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <React.Fragment>
                            <Search/>
                        </React.Fragment>
                    ),
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20}/> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                }}/>
            )}
            renderOption={(props, option: PostType) => {


                return (

                    <ListItem {...props}
                              key={value?.title}
                              disableGutters
                              dense
                              disablePadding
                              style={{paddingInline: "2px"}}
                    >
                        <a target={"_blank"} href={
                            "/blog/posts/" +
                            option?.slug}> <ListItemButton disableGutters
                                                           disableRipple
                                                           role={undefined}
                                                           onClick={() => {
                                                               //setOpenSlug(value?.value);
                                                               // setOpen(true);
                                                           }}
                                                           sx={{alignItems: "start"}}
                                                           dense

                        ><ListItemAvatar>
                            <img src={
                                process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                "/images/posts/" +
                                option?.image

                            }
                                 style={{paddingInline: '0px 5px', paddingTop: "10px"}}
                                 alt={""}
                                 width={"70px"}
                                 height={"auto"}
                            />
                        </ListItemAvatar>
                            <ListItemText
                                primary={<Typography
                                    sx={{"&::first-letter": {textTransform: "uppercase"}}}
                                    fontSize={12}>{option?.title}
                                </Typography>
                                }/>

                        </ListItemButton>
                        </a>
                    </ListItem>

                );
            }}></Autocomplete>
    );
}
