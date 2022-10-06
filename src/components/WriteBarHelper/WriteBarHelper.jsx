import React from 'react';

// Component
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { Grid } from '@mui/material';


function WriteBarHelper(props) {
    return (
        <Grid container sm={3} pt={1} spacing={3}>
            <Grid item>
                <HistoryIcon fontSize='medium' sx={{ cursor: 'pointer' }} titleAccess='History of Client' onClick={() => console.log('history')} />
            </Grid>
            <Grid item>
                <SearchIcon fontSize='medium' sx={{ cursor: 'pointer' }} titleAccess='Search' onClick={() => console.log('Search')} />
            </Grid>
            <Grid item>
                <EmojiObjectsOutlinedIcon fontSize='medium' sx={{ cursor: 'pointer' }} titleAccess='Create' onClick={() => console.log('Create')} />
            </Grid>
        </Grid>
    );
}

export default WriteBarHelper;