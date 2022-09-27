import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useListCLients } from '../../service/fetchHoo';

// Components
import SoftBox from 'components/SoftBox';
import HeadBotons from './component/HeadBotons';
import AssignedToBar from './component/AssignedToBar';
import ListClient from './component/ListClient';
import { Divider } from '@mui/material';

function ClientContainer() {
    const { listCMs } = useSelector(state => state.listCM);
    const dispatchRedux = useDispatch();
    const [caseManager, setCaseManager] = useState('');
    const { lisClients, isLoading, isError, loadData } = useListCLients();


    function loadBillingData(id, event, value) {
        event.preventDefault();
        const cM = value.label;
        // console.log(cM);
        loadData({ cm: cM });
        // console.log(lisClients);
        setCaseManager(cM);
        // dispatchRedux(fectListServsByCM({ cm: cM }));
        // setCaseManager(cM);
    }
    return (
        <SoftBox mb={3} mt={3}>
            <HeadBotons title={'Area of Client'} />
            <Divider style={{ margin: 0 }} />
            <AssignedToBar listCMs={listCMs} title={'Assignated to:'} handleChange={loadBillingData} currentCM={caseManager} />
            <Divider style={{ margin: 0 }} />
            <ListClient datas={lisClients} />
        </SoftBox>
    )
}

export default ClientContainer