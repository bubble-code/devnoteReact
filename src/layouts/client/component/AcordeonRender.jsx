import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

// Component
import { Accordion, AccordionDetails, AccordionSummary, Avatar, TableBody, TableRow } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import SoftTypographyRoot from "components/SoftTypography/SoftTypographyRoot";

function AcordeonRender({ data, icon, ...rest }) {

    function stringToColor(string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    function stringAvatar(name, lastName = '') {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 24,
                height: 24
            },
            children: <SoftTypography variant="button" sx={{ fontSize: '0.7rem' }}>{`${name[0]}${lastName[0]}`}</SoftTypography>
        }
    }
    return (
        data.map((item, index) => {
            const { name, lastName } = item;
            return <Accordion key={uuidv4()}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <SoftBox display="flex" alignItems="center" color="palettePastel" size="sm" container wordSpacing='0.1rem' >
                        <SoftBadge variant="button" badgeContent=<SoftTypography variant="button" sx={{ fontSize: '0.8rem', fontWeight:'400' }}>{`${name} ${lastName}`}</SoftTypography> color="palettePastel" size="sm" container wordSpacing='0.1rem' />
                        <SoftBox>
                            <Avatar  {...stringAvatar(item.name, item.lastName)} />
                        </SoftBox>
                    </SoftBox>
                </AccordionSummary>
                <AccordionDetails style={{ width: '100%' }}>
                    <SoftBox display='flex' justifyContent='space-between' >
                        <SoftBox>
                            <SoftBox>
                                <SoftTypography variant="button" fontWeight="regular" textTransform='capitalize' color='blue'>
                                    {`${item.name} ${item.lastName}`}
                                </SoftTypography>
                            </SoftBox>
                        </SoftBox>
                        <SoftBox>
                            <SoftBox display='flex' justifyContent='space-between' >
                                <SoftTypography variant="button" fontWeight="regular" textTransform='capitalize' color='blue'>
                                    {`Name: ${item["name"]}`}
                                </SoftTypography>
                            </SoftBox>
                        </SoftBox>
                        <SoftBox>
                            <SoftTypography variant="button" fontWeight="regular" textTransform='capitalize' color='blue' cursor='pointer' onClick={() => console.log('daledal')}>
                                edit
                            </SoftTypography>
                        </SoftBox>
                    </SoftBox>
                </AccordionDetails>
            </Accordion>
        })
    )
}

export default AcordeonRender;

AcordeonRender.propTypes = {
    data: PropTypes.array,
    icon: PropTypes.element,
};




