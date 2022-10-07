/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useSelector } from "react-redux";


// Component
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Collapse, Row, Space, Spin, Col } from 'antd';

import './style.css'
import "antd/dist/antd.css";


function TableRender() {
    const { data = [], loading } = useSelector(state => state.historyClient);

    const { Panel } = Collapse;

    return (
        <SoftBox display='flex' justifyContent='center' flexDirection='column' alignItems='center' >
            {loading ? <Space size="middle"> <Spin size="large" /></Space> : <Collapse style={{ width: '100%' }}>
                {data.map((item, index) => {
                    const { fecha, sNote, description } = item;
                    return (
                        <Panel key={index} header={
                            <Row >
                                <Col>
                                    <SoftTypography sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.08rem' }}>{fecha.slice(0, -5)}</SoftTypography>
                                </Col>
                                <Col offset={4} >
                                    <SoftTypography sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.07rem' }}>{Object.values(description).join(' / ')}</SoftTypography>
                                </Col>
                            </Row>} >
                            <Row >
                                <p style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} >
                                    {sNote}
                                </p>
                            </Row>
                        </Panel>

                    );
                })}
            </Collapse>}
        </SoftBox>);
}

export default TableRender;

