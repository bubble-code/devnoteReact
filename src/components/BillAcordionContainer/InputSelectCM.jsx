import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fectListServsByCM, clearListServicesByCM } from '../../redux/actions/actions';
import PropTypes from "prop-types";

// Component
import SelectInput from "../SelectInput";
import SoftBox from "components/SoftBox";

function InputSelectCM() {
    const ref1 = React.useRef();
    const dispatchRedux = useDispatch();
    const CMRedux = useSelector(state => state.listCM);
    const { listCMs } = CMRedux;

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
        <SoftBox>
            <SelectInput data={listCMs} onchange={loadBillingData} hText="Choice CM Name" ref={ref1} id='cm' />
        </SoftBox>
    )
}

export default InputSelectCM