/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import Card from '@mui/material/Card';
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import TableRender from "../../examples/Tables/Table";
import SelectInput from "../../components/SelectInput";
import { useDispatch, useSelector } from 'react-redux';
import { fectListServsByCM, fectCurrentClToNote } from '../../redux/actions/actions'
import PropTypes from "prop-types";
import SoftButton from "components/SoftButton";
import { grey } from '@mui/material/colors';

function TableBillingService({ py, mb, headTitle }) {
    const dispatchRedux = useDispatch();
    const CMRedux = useSelector(state => state.listCM);
    const { listCMs } = CMRedux;
    const [caseManager, setCaseManager] = useState('');
    const ref1 = React.useRef();

    async function loadBillingData(id, event, value) {
        const cM = value.label;
        dispatchRedux(fectListServsByCM({ cm: cM }));
        setCaseManager(cM);
    }
    async function reloadTable() {
        dispatchRedux(fectListServsByCM({ cm: caseManager }));
    }

    return (
        <SoftBox py={py} bgColor={grey[600]} borderRadius='md'>
            <SoftBox mb={mb}>
                <Card sx={{ minHeight: 250 }} >
                    <SoftBox display="flex" justifyContent="start" alignItems="center" p={3}>
                        <SoftTypography variant="h6" mr={5} sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.8rem' }}>{headTitle} </SoftTypography>
                        <SelectInput data={listCMs} onchange={loadBillingData} hText="Choice CM Name" ref={ref1} id='cm' />
                        <SoftButton onClick={reloadTable} variant="contained" color="primary" ml={2}>Reload</SoftButton>
                    </SoftBox>
                    <SoftBox sx={{
                        "& .MuiTableRow-root:not(:last-child)": {
                            "& td": {
                                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                    `${borderWidth[1]} solid ${borderColor}`,
                            },
                        },
                    }}
                    >
                        {/**/}
                        <TableRender />
                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>
    );
}

TableBillingService.propTypes = {
    py: PropTypes.number,
    mb: PropTypes.number,
    headTitle: PropTypes.string
};

export default TableBillingService;

