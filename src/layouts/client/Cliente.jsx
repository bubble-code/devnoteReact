import React from 'react';
// Components
import SoftBox from 'components/SoftBox';
import HeadBotons from './component/HeadBotons';
import { Divider } from '@mui/material';
import TabBarClient from './component/TabBar';

function ClientContainer() {
    return (
        <SoftBox mb={3} mt={3}>
            <HeadBotons title={'Area of Client'} />
            <Divider style={{ margin: 0 }} />
            <TabBarClient />
        </SoftBox>
    )
}

export default ClientContainer