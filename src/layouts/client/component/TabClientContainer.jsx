import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

// Components
import SoftBox from "components/SoftBox";
import { Divider, CircularProgress } from "@mui/material";
import BarAddChoose from './BarAddChoose';
import ListClient from './ListClient';


function TabClientContainer(props) {
    const { listCMs } = useSelector(state => state.listCM);
    const { loading, error, loadData, loadBillingData, caseManager, handleClickOpen, lisClients } = props;
    return (
        <SoftBox>
            <BarAddChoose listCMs={listCMs} title={'Assignated to:'} handleChange={loadBillingData} currentCM={caseManager} addOpen={handleClickOpen} />
            <Divider style={{ margin: 0 }} />
            {loading ? <CircularProgress /> : <ListClient datas={lisClients} />}
            {/*<ModalAddClient open={open} handleClose={handleClose} />*/F}
        </SoftBox>
    )
}
export default TabClientContainer

TabClientContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadData: PropTypes.func.isRequired,
    loadBillingData: PropTypes.func.isRequired,
    caseManager: PropTypes.string.isRequired,
    handleClickOpen: PropTypes.func.isRequired,
    lisClients: PropTypes.array.isRequired,
};