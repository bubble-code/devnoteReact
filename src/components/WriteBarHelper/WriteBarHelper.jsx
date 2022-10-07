import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fectHistoryByClient } from "../../redux/actions/actions"

// Component
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { Grid } from '@mui/material';
import WriteModalHelper from '../WriteModalHelper/WriteModalHelper';
import TableRender from '../TableHistory/TableRender';
import SearchHeper from '../SearchHelper/SearchHelper'

function WriteBarHelper() {
    const [openHist, setOpenHist] = useState({ history: false, searc: false });
    const { currentClient } = useSelector(state => state.currentClToNote);
    const { cm, cn } = currentClient;
    const dispatchRedux = useDispatch();

    const switchOpen = {
        history: () => dispatchRedux(fectHistoryByClient({ cm, cn })),
    };


    const handleOpen = (id, isOpen) => {

        if (id === 'history' && cn) {
            switchOpen[id]();
        }
        setOpenHist(stat => {
            // console.log({...stat});
            return ({ ...stat, [id]: isOpen })
        });
    };
    return (
        <Grid container sm={3} pt={1} spacing={3}>
            <Grid item>
                <HistoryIcon fontSize='medium' sx={{ cursor: 'pointer' }} titleAccess='History of Client' onClick={() => handleOpen("history", true)} />
            </Grid>
            <Grid item>
                <SearchIcon fontSize='medium' sx={{ cursor: 'pointer' }} titleAccess='Search' onClick={() => handleOpen("searc", true)} />
            </Grid>
            <Grid item>
                <EmojiObjectsOutlinedIcon fontSize='medium' sx={{ cursor: 'pointer' }} titleAccess='Create' onClick={() => console.log('Create')} />
            </Grid>
            {openHist["history"] && <WriteModalHelper open={openHist['history']} setOpen={setOpenHist} title={'Client History'} id="history"><TableRender cm={cm} cn={cn} /></WriteModalHelper>}
            {openHist["searc"] && <WriteModalHelper open={openHist['searc']} setOpen={setOpenHist} title={'Search'} id="searc"><SearchHeper /></WriteModalHelper>}
        </Grid>
    );
}

export default WriteBarHelper;