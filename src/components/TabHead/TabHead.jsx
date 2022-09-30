import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import SoftBox from 'components/SoftBox';
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

export default function TabBarClient({ tabs }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <SoftBox sx={{ width: '100%' }}>
            <SoftBox sx={{ borderBottom: 1, borderColor: 'divider', width: '50%' }}>
                <Tabs value={value} onChange={handleChange} display='flex' sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', justifyContent: 'start' }}>
                    {tabs.map((tab, index) => (
                        <Tab label={tab.label} {...a11yProps(index)} key={uuidv4()} />
                    ))}
                </Tabs>
            </SoftBox>
            {tabs.map((tab, index) => (
                <TabPanel value={value} index={index} key={uuidv4()}>{tab.component}</TabPanel>
            ))}
        </SoftBox>
    );
}

TabBarClient.propTypes = {
    tabs: PropTypes.array,
};