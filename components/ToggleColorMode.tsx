import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'lib/store';
import {toggleDarkMode} from 'lib/reducers/darkModeSlicer';


function ToggleColorMode() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);
    const toggleColorMode = () => {
        dispatch(toggleDarkMode());
    };
    return (
        <Box sx={{maxWidth: '32px'}}>
            <Button
                variant="text"
                onClick={toggleColorMode}
                size="small"
                aria-label="button to toggle theme"
                sx={{minWidth: '32px', height: '32px', p: '4px'}}
            >
                {isDarkMode ? (
                    <WbSunnyRoundedIcon fontSize="small"/>
                ) : (
                    <ModeNightRoundedIcon fontSize="small"/>
                )}
            </Button>
        </Box>
    );
}

export default ToggleColorMode;
