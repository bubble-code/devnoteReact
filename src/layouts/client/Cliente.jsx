import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useListCLients } from '../../service/fetchHoo';

// Components
import SoftBox from 'components/SoftBox';
import HeadBotons from './component/HeadBotons';
import BarAddChoose from './component/BarAddChoose';
import ListClient from './component/ListClient';
import { CircularProgress, Divider } from '@mui/material';
import ModalAddClient from './component/ModalAddClient';

function ClientContainer() {
    const { listCMs } = useSelector(state => state.listCM);
    const dispatchRedux = useDispatch();
    const [caseManager, setCaseManager] = useState('');
    const [open, setOpen] = useState(false);
    const { lisClients, loading, error, loadData } = useListCLients();


    function loadBillingData(id, event, value) {
        event.preventDefault();
        const cM = value.label;
        loadData({ cm: cM });
        setCaseManager(cM);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <SoftBox mb={3} mt={3}>
            <HeadBotons title={'Area of Client'} />
            <Divider style={{ margin: 0 }} />
            <BarAddChoose listCMs={listCMs} title={'Assignated to:'} handleChange={loadBillingData} currentCM={caseManager} addOpen={handleClickOpen} />
            <Divider style={{ margin: 0 }} />
            {loading ? <CircularProgress /> : <ListClient datas={lisClients} />}
            <ModalAddClient open={open} handleClose={handleClose} />
        </SoftBox>
    )
}

export default ClientContainer