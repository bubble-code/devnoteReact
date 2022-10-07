/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fectListServsByCM, clearListServicesByCM } from '../../redux/actions/actions';
import PropTypes from "prop-types";

// Component
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import BillAcordionRender from "../BillBodyAcordRender/BillBodyAcordRender";
import SelectInput from "../SelectInput";
import CachedIcon from '@mui/icons-material/Cached';
import BillInputFilterByClient from "../BillInputFilterByClient/BillInputFilterByClient";

import { grey } from '@mui/material/colors';


function ContainerAcordionBilling({ mb, headTitle }) {
    const dispatchRedux = useDispatch();
    const CMRedux = useSelector(state => state.listCM);
    const listServiceState = useSelector(state => state.listServiByCM);
    const { data: { initialData, data, cWithBill }, loading, cm } = listServiceState;
    const { listCMs } = CMRedux;
    const ref1 = React.useRef();


    function loadBillingData(id, event, value) {
        const cM = value?.label || value;
        // console.log("cM", cM);
        if (cM) {
            dispatchRedux(fectListServsByCM({ cm: cM }));
        } else {
            dispatchRedux(clearListServicesByCM());
        }
    }

    return (
        <SoftBox sx={{ minHeight: 250, padding: 2 }} bgColor={grey[300]} borderRadius='md' mb={mb}>
            <SoftBox display="flex" justifyContent="start" alignItems="center" >
                <SoftBox >
                    <SoftTypography variant="h6" mr={5} sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.8rem', textAling: 'center' }}>{headTitle} </SoftTypography>
                </SoftBox>
                <SoftBox>
                    <SelectInput data={listCMs} onchange={loadBillingData} hText="Choice CM Name" ref={ref1} id='cm' />
                </SoftBox>
                <SoftBox ml={2}>
                    <CachedIcon onClick={() => loadBillingData(null, null, cm)} color={'primary'} cursor={'pointer'} fontSize={'medium'} titleAccess={'Reload'} />
                </SoftBox>
                <SoftBox ml={2}>
                    <BillInputFilterByClient cWithBill={cWithBill} initialData={initialData} />
                </SoftBox>
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
                <BillAcordionRender />
            </SoftBox>
        </SoftBox>
    );
}

ContainerAcordionBilling.propTypes = {
    py: PropTypes.number,
    mb: PropTypes.number,
    headTitle: PropTypes.string,
    isOpen: PropTypes.bool,
    handleOpen: PropTypes.func,
};

export default ContainerAcordionBilling;

