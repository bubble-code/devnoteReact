import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useSoftUIController, setOpenModalEditService } from 'context';
import { useGetServiceById, useListServices, useSaveNote } from '../../service/fetchHoo'

// Components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, Divider } from '@mui/material';
import FormAdd from '../BillModalFormAdd/FormAdd';
import SoftBox from 'components/SoftBox';


const defaultValues = {
    name: "",
    lastName: "",
    cnumb: "",
    dob: "",
    dxCode: "",
    dataAssigned: "",
    gender: ''
};

export default function BillModalEditService() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [formValues, setFormValues] = useState(defaultValues);
    const [controller, dispatch] = useSoftUIController();
    const { openModalEditService } = controller;
    const { open, id, cm } = openModalEditService;
    const { error, loading, data } = useGetServiceById({ id, cm });
    const { listServices, error: errorListService, loading: loadingListService } = useListServices();
    const { error: errorSave, loading: loginSave, saveData } = useSaveNote();
    // const { loading, error, addClient } = useAddClient();

    const handleClose = () => {
        setOpenModalEditService(dispatch, { open: false, id: null, cm: null, });
    };

    function handleSubmit(data) {
        // console.log("dataSubmit", data);
        saveData({ cm, id, data })
        // if (!error) {
        // dispatchRedux({ type: 'CURRENT_CL_TO_NOTE_SUCCESS', value: {} })
        // setFormData(initialValues);
        // }
    }
    return (
        <SoftBox >
            <Dialog
                fullScreen={fullScreen}
                open={openModalEditService.open}
                onClose={handleClose}
            // aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle >
                    {"Edit Service"}
                    <Divider color='grey' />
                </DialogTitle>
                <DialogContent>
                    <FormAdd id={id} cm={cm} handleClose={handleClose} data={data} listServices={listServices} handleSubmit={handleSubmit} />
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </SoftBox>
    );
}

BillModalEditService.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleOpen: PropTypes.func
};