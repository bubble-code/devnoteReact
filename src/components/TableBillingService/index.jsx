/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import Card from '@mui/material/Card';
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import Table from "../../examples/Tables/Table";
import DataService from "../../service/services";
import SelectInput from "../../components/SelectInput";
import { useSoftUIController, setCurrentClToNote, setListBilling } from "../../context";
import { useDispatch } from 'react-redux';
import { fectListServsByCM, fectCurrentClToNote } from '../../redux/actions/actions'
import PropTypes from "prop-types";
import SoftButton from "components/SoftButton";

function TableBillingService({ py, mb, headTitle }) {
    const dispatchRedux = useDispatch();
    const [caseManager, setCaseManager] = useState('');
    const [controler, dispatch] = useSoftUIController();
    const { listCM } = controler;
    const ref1 = React.useRef();

    async function setCurrentClForNote({ id, cmm }) {
        dispatchRedux(fectCurrentClToNote({ cm: cmm, id }));
        const res = await DataService.getServiceById({ cm: cmm, id: id });
        setCurrentClToNote(dispatch, res);
    }

    async function loadBillingData(id, event, value) {
        const cM = value.label;
        dispatchRedux(fectListServsByCM({ cm: cM }));
        setCaseManager(cM);
    }
    async function reloadTable() {
        dispatchRedux(fectListServsByCM({ cm: caseManager }));
    }

    return (
        <SoftBox py={py}>
            <SoftBox mb={mb}>
                <Card sx={{ minHeight: 250 }}>
                    <SoftBox display="flex" justifyContent="start" alignItems="center" p={3}>
                        <SoftTypography variant="h6" mr={5}>{headTitle} </SoftTypography>
                        <SelectInput data={listCM} onchange={loadBillingData} parse hText="Choice CM Name" ref={ref1} id='cm' />
                        <SoftButton onClick={reloadTable} variant="contained" color="primary" ml={2}>Reload</SoftButton>
                    </SoftBox>
                    <SoftBox
                        sx={{
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                        {/**/}
                        <Table onClientClick={setCurrentClForNote} />
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

