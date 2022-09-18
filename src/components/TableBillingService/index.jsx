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
import { fectListBilling } from '../../redux/actions/actions'
import PropTypes from "prop-types";
import { columns } from "./colunmHead";
import SoftButton from "components/SoftButton";

function TableBillingService({ py, mb, headTitle }) {
    const [caseManager, setCaseManager] = useState('');
    const [controler, dispatch] = useSoftUIController();
    const { listCM } = controler;
    const ref1 = React.useRef();
    const dispatchRedux = useDispatch();

    function fectListB({ caseManager }) {
        dispatchRedux(fectListBilling({ caseManager }))
    }


    async function setCurrentClForNote({ id, cmm }) {
        const res = await DataService.getServiceById({ cm: cmm, id: id });
        setCurrentClToNote(dispatch, res);
    }

    async function loadBillingData(id, event, value) {
        const cM = value.label;
        setCaseManager(cM);

    }
    function reloadTable() {
        const ccm = caseManager;
        // console.log(ccm);
        setCaseManager('');
        // (() => setCaseManager(ccm))();
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
                        <Table columns={columns} cmm={caseManager} onClientClick={setCurrentClForNote} />
                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>
    );
}

TableBillingService.propTypes = {
    py: PropTypes.number,
    mb: PropTypes.number,
    columns: PropTypes.array,
    rows: PropTypes.array,
    headTitle: PropTypes.string
};

export default TableBillingService;

