import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

// Component
import SelectInput from "components/SelectInput";
import SoftBox from "components/SoftBox";


function BillInputFilterByClient() {
    const listServiceState = useSelector(state => state.listServiByCM);
    const { data: { initialData, data, cWithBill }, loading, cm } = listServiceState;
    const dispatchRedux = useDispatch();

    function handleFilter(id, event, value) {
        if (value !== null) {
            const { label } = value;
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
        <SoftBox ml={2}>
            <SelectInput data={cWithBill.map(e => ({ label: e }))} onchange={handleFilter} hText="Filter Name" id='filter1' />
        </SoftBox>
    )
}

export default BillInputFilterByClient


BillInputFilterByClient.propTypes = {
    initialData: PropTypes.object,
    cWithBill: PropTypes.array
};