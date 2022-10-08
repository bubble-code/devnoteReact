import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fectListServsByCM, clearListServicesByCM } from '../../redux/actions/actions';

// Component
import SoftBox from "components/SoftBox";
import CachedIcon from '@mui/icons-material/Cached';

function IconReloadService() {
    const dispatchRedux = useDispatch();
    const listServiceState = useSelector(state => state.listServiByCM);
    const { cm } = listServiceState;

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
        <SoftBox ml={2}>
            <CachedIcon onClick={() => loadBillingData(null, null, cm)} color={'primary'} cursor={'pointer'} fontSize={'medium'} titleAccess={'Reload'} />
        </SoftBox>
    )
}

export default IconReloadService