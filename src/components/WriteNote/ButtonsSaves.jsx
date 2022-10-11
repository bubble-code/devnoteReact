import React from "react";
import { useDispatch } from 'react-redux';
import { updateNotes, completedNote } from '../../redux/actions/actions';
import PropTypes from "prop-types";


// Component
import { Row, Col } from 'antd';
import SoftButton from "components/SoftButton";
import { Icon } from "@mui/material";

function ButtonsSave({ formVal, handleOpenSnack, viewInProccess }) {
    const dispatchRedux = useDispatch();

    function handleSubmit(obj) {
        dispatchRedux(updateNotes({ value: { ...formVal, ...obj } }));

        if (obj?.status === 'completed') {
            dispatchRedux(completedNote({ value: { ...formVal, ...obj } }));
            dispatchRedux({ type: 'CURRENT_CL_TO_NOTE_SUCCESS', value: {} })
        }
        if (obj?.isInProcess) {
            dispatchRedux({ type: 'CURRENT_CL_TO_NOTE_SUCCESS', value: { ...formVal, ...obj } })
        }
        handleOpenSnack(true);
    }

    return (
        <Col span={24}>
            <Row justify="end" gutter={[24, 24]} >
                <Col>
                    <SoftButton variant="gradient" color={"dark"} onClick={() => handleSubmit({ ['isInProcess']: true })}>
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Save Note
                    </SoftButton>
                </Col>
                <Col>
                    <SoftButton variant="gradient" color={"success"} onClick={() => handleSubmit({ ['status']: 'completed', ['isInProcess']: false })} disabled={viewInProccess}>
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Approved
                    </SoftButton>
                </Col>
            </Row>
        </Col>
    )
}

export default ButtonsSave;

ButtonsSave.propTypes = {
    formVal: PropTypes.object.isRequired,
    handleOpenSnack: PropTypes.func.isRequired,
    viewInProccess: PropTypes.bool.isRequired,
};