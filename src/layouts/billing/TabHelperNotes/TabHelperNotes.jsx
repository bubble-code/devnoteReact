import React from "react";
import { Box, Grid, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableHistory from "../components/TableHistory/TableHistory";
import SearchHelperNotes from "../components/Search/Search";
import { grey } from '@mui/material/colors';


function TabHelperNotes() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}  >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} ml={2} >
                <TabList onChange={handleChange} style={{ background: grey[400] }}>
                    <Tab label="History Client" value="1" />
                    <Tab label="Search" value="2" />
                    <Tab label="Create" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1" >
                <Grid item md={0} ml={0} mr={0} mt={0}>
                    <TableHistory />

                </Grid>
            </TabPanel>
            <TabPanel value="2">
                <SearchHelperNotes />
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
    );
}

export default TabHelperNotes;