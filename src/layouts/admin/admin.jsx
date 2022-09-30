import React from "react";
import PropTypes from "prop-types";
import tabs from './tabs';

// Components
import SoftBox from 'components/SoftBox';
import HeadBotons from '../client/component/HeadBotons';
import { Divider } from '@mui/material';
import TabHead from '../../components/TabHead/TabHead';
const AdminLayout = ({ }) => {
    return (
        <SoftBox mb={3} mt={3}>
            <HeadBotons title={'Area of Admin'} />
            <Divider style={{ margin: 0 }} />
            <TabHead tabs={tabs()} />
        </SoftBox>
    );
};

export default AdminLayout;

AdminLayout.propTypes = {

};