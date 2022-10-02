import React, { useState, useRef, useEffect } from 'react';
import { initialValClients, initialValService } from '../initialValues';
import { useAddDxCode, useAddService } from '../../../service/fetchHoo';

// Components
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { TextField, Divider } from '@mui/material';
// Styles
import { stylesCard } from '../styles';

function ClientAdmin() {
    const [formValues, setFormValues] = useState(initialValClients());
    const [serviceValue, setServiceValue] = useState(initialValService());

    const { loading, error, addDxCode } = useAddDxCode();
    const { loading: loginService, error: errorService, addService } = useAddService();

    function handleSubmit(e) {
        e.preventDefault();
        addDxCode({ dxCode: formValues });
        setFormValues(initialValClients());
    }
    function handleSubmitService(e) {
        e.preventDefault();
        addService({ serviceDx: serviceValue });
        setServiceValue(initialValService());
    }
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormValues(Object.assign({}, formValues, { [name]: value }));
    }
    function handleInputService(e) {
        const { name, value } = e.target;
        setServiceValue(Object.assign({}, serviceValue, { [name]: value }));
    }

    return (
        <SoftBox display='flex' flexDirection="row" style={{ width: 'auto', flexWrap: 'wrap' }} >
            <SoftBox sx={stylesCard()} mr={2}>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <SoftBox display='flex' flexDirection='column'   >
                        <SoftBox mt={4} >
                            <TextField
                                sx={{ width: '100%' }}
                                name="dxCode"
                                // label="Name"
                                type="text"
                                value={formValues.dxCode}
                                onChange={handleInputChange}
                                helperText="Dx Code"
                                autoFocus
                            />
                        </SoftBox>
                        <SoftBox mt={4} >
                            <TextField
                                name="dxDesx"
                                sx={{ width: '100%' }}
                                // label="Last Name"
                                type="text"
                                value={formValues.dxDesx}
                                onChange={handleInputChange}
                                helperText="Description Dx Code"
                            />
                        </SoftBox>
                        <SoftBox display='flex' mt={4} justifyContent='end' >
                            <SoftButton onClick={() => { }} variant="contained" color="primary" type="submit">
                                Save
                            </SoftButton>
                        </SoftBox>
                    </SoftBox>
                </form>
            </SoftBox>
            {/* Types Services */}
            <SoftBox sx={stylesCard()} mr={2} >
                <form onSubmit={handleSubmitService} style={{ width: '100%' }}>
                    <SoftBox style={{ justifyContent: 'space-around', display: 'flex', flexDirection: 'column', height: 'inherit' }} >
                        <SoftBox mt={4} style={{ flex: 2 }} >
                            <TextField
                                sx={{ width: '100%' }}
                                name="serviceDesx"
                                // label="Name"
                                type="text"
                                value={serviceValue.serviceDesx}
                                onChange={handleInputService}
                                helperText="Service Type"
                                autoFocus
                            />
                        </SoftBox>
                        <SoftBox display='flex' mt={4} flexDirection='Column' alignItems='end' justifyContent='space-around' style={{ flex: 1 }}>
                            <SoftButton onClick={() => { }} variant="contained" color="primary" type="submit">
                                Save
                            </SoftButton>
                        </SoftBox>
                    </SoftBox>
                </form>
            </SoftBox >
        </SoftBox >
    )
}
export default ClientAdmin