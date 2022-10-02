import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useSoftUIController, setOpenModalEditService } from 'context';
import { useGetServiceById } from '../../service/fetchHoo'

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
    // const { loading, error, addClient } = useAddClient();

    const handleClose = () => {
        setOpenModalEditService(dispatch, { open: false, id: null, cm: null, });
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(formValues);
    //     addClient({ cm: 'Lia', data: formValues });
    //     handleClose();
    // };
    return (
        <SoftBox sx={{ height: '1200px' }}>
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
                    <FormAdd id={id} cm={cm} handleClose={handleClose} data={data} />
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