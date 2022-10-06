import React from "react";
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";

// Component
import SelectInput from "components/SelectInput";
import { useEffect } from "react";


function BillInputFilterByClient({ initialData, cWithBill }) {

    const dispatchRedux = useDispatch();
    // console.log("value", initialData);

    useEffect(() => {
        console.log("value", initialData);
    }, [initialData, cWithBill]);

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
        <SelectInput data={cWithBill.map(e => ({ label: e }))} onchange={handleFilter} hText="Filter Name" id='filter1' />
    )
}

export default BillInputFilterByClient


BillInputFilterByClient.propTypes = {
    initialData: PropTypes.object,
    cWithBill: PropTypes.array
};