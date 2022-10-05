/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fectListServsByCM, fectCurrentClToNote, fectListClientsByCM } from '../../redux/actions/actions';
import { useDeleteService, useUpdateService } from '../../service/fetchHoo';
import { useSoftUIController, setOpenModalEditService } from "context";
import ListServiOrderByDate from './funtiHelper';
import PropTypes from "prop-types";

// Component
import Card from '@mui/material/Card';
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import BillAcordionRender from "../BillBodyAcordRender/BillBodyAcordRender";
import SelectInput from "../SelectInput";
import SoftButton from "components/SoftButton";


import { grey } from '@mui/material/colors';


function ContainerAcordionBilling({ py, mb, headTitle }) {
    const dispatchRedux = useDispatch();
    const CMRedux = useSelector(state => state.listCM);
    const listServiceState = useSelector(state => state.listServiByCM);
    // console.log("listServiceState", listServiceState);
    const { data: { initialData = {}, data = {}, cWithBill = [] }, loading } = listServiceState;
    // const [selectdClient, setSelectdClient] = useState('');
    // const { data = {}, cWithBill = [] } = objData;
    const { listCMs } = CMRedux;
    const [caseManager, setCaseManager] = useState('');
    const ref1 = React.useRef();
    const { error, delteItem, loading: load } = useDeleteService();
    const { error: errorUpdate, loading: loadingUpdate, updateItem } = useUpdateService();
    const [controller, dispatch] = useSoftUIController();
    // console.log("datas", data);
    // console.log("cWithBill", cWithBill);

    function handleOpen({ id, cm }) {
        setOpenModalEditService(dispatch, { open: true, id, cm });
    }

    function loadBillingData(id, event, value) {
        const cM = value.label;
        dispatchRedux(fectListServsByCM({ cm: cM }));
        // dispatchRedux(fectListClientsByCM({ cm: cM })); 
        setCaseManager(cM);
    }
    async function reloadTable() {
        dispatchRedux(fectListServsByCM({ cm: caseManager }));
    }

    const deleteItemFromTable = ({ id, cm }) => {
        // console.log({ id, cm });
        delteItem({ id, cm });
        if (!error) {
            dispatchRedux(fectListServsByCM({ cm }));
        }
    };
    const upDateItemFromTable = ({ id, cm }) => {
        // console.log({ id, cm });
        updateItem({ id, cm, data });
        if (!error) {
            dispatchRedux(fectListServsByCM({ cm }));
        }
    };

    const setCurrentClForNote = ({ id, cm }) => {
        dispatchRedux(fectCurrentClToNote({ cm, id }));
    };

    let group = ListServiOrderByDate({ data, handleDelete: deleteItemFromTable, handleEdit: upDateItemFromTable, setCurrentClForNote: setCurrentClForNote, setOpenModal: handleOpen });

    function handleFilter(id, event, value) {
        if (value !== null) {
            const { label } = value;
            // console.log("value", initialData);
            const filter = [];
            Object.keys(initialData).map((item) => {
                let result = initialData[item].filter(item2 => item2.cn === label);
                if (result.length > 0) {
                    filter[item] = result;
                }
            });
            // console.log("filter", { ...filter });
            dispatchRedux({ type: 'LIST_SERVICES_BY_CM_SUCCESS', value: { initialData, data: { ...filter }, cWithBill } });
        } else {
            dispatchRedux({ type: 'LIST_SERVICES_BY_CM_SUCCESS', value: { initialData, data: initialData, cWithBill } });
        }
    };







    return (
        <SoftBox py={py} bgColor={grey[600]} borderRadius='md'>
            <SoftBox mb={mb}>
                <Card sx={{ minHeight: 250 }} >
                    <SoftBox display="flex" justifyContent="start" alignItems="center" p={3}>
                        <SoftTypography variant="h6" mr={5} sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.8rem' }}>{headTitle} </SoftTypography>
                        <SelectInput data={listCMs} onchange={loadBillingData} hText="Choice CM Name" ref={ref1} id='cm' />
                        <SelectInput data={Array.from(cWithBill).map(e => ({ label: e }))} onchange={handleFilter} hText="Choice CM Name" ref={ref1} id='cm' />
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
                        <BillAcordionRender group={group} loading={loading} len={data.length} data={data} />
                    </SoftBox>
                </Card>
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

