import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useListCLients } from '../../../service/fetchHoo';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BarAddChoose from './BarAddChoose';
import { CircularProgress, Divider } from '@mui/material';
import ModalAddClient from './ModalAddClient';
import ListClient from './ListClient';
import SoftBox from 'components/SoftBox';
import TabAddClient from './TabAddClient';
import tabs from '../tabs';
import { v4 as uuidv4 } from 'uuid';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabBarClient() {
    const { listCMs } = useSelector(state => state.listCM);
    const [value, setValue] = useState(0);
    const [caseManager, setCaseManager] = useState('');
    const [open, setOpen] = useState(false);

    const { lisClients, loading, error, loadData } = useListCLients();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function loadBillingData(id, event, value) {
        event.preventDefault();
        const cM = value.label;
        loadData({ cm: cM });
        setCaseManager(cM);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <SoftBox sx={{ width: '100%' }}>
            <SoftBox sx={{ borderBottom: 1, borderColor: 'divider', width: '50%' }}>
                <Tabs value={value} onChange={handleChange} display='flex' sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', justifyContent: 'start' }}>
                    {tabs().map((tab, index) => (
                        <Tab label={tab.label} {...a11yProps(index)} key={uuidv4()} />
                    ))}
                </Tabs>
            </SoftBox>
            <TabPanel value={value} index={0}>
                <BarAddChoose listCMs={listCMs} title={'Assignated to:'} handleChange={loadBillingData} currentCM={caseManager} addOpen={handleClickOpen} />
                <Divider style={{ margin: 0 }} />
                {loading ? <CircularProgress /> : <ListClient datas={lisClients} />}
                <ModalAddClient open={open} handleClose={handleClose} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabAddClient />
            </TabPanel>
        </SoftBox>
    );
}

TabBarClient.propTypes = {
    listCMs: PropTypes.array,
    loadBillingData: PropTypes.func,
    caseManager: PropTypes.string,
    handleClickOpen: PropTypes.func,
    handleClose: PropTypes.func,
};