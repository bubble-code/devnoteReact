/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";


// Component
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Collapse, Row, Space, Spin, Col } from 'antd';

// import './style.css'
import "antd/dist/antd.css";


function TableRender() {
    const { search = [], loading } = useSelector(state => state.historyClient);

    const { Panel } = Collapse;

    return (
        <SoftBox display='flex' justifyContent='center' flexDirection='column' alignItems='center' >
            {loading ? <Space size="middle"> <Spin size="large" /></Space> : <Collapse style={{ width: '100%' }}>
                {search.map((item, index) => {
                    const { fecha, sNote, description, cm, min, cn } = item;
                    // console.log('item', item);
                    return (
                        <Panel key={index} header={
                            <Row >
                                <Col>
                                    <SoftTypography sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.08rem' }}>{moment(fecha, "DD-MM-YYYY").format('DD-MM')}</SoftTypography>
                                </Col>
                                <Col offset={1} span={11} >
                                    <SoftTypography sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05rem' }}>{Object.values(description).join(' / ')}</SoftTypography>
                                </Col>
                                <Col offset={1} span={3}>
                                    <SoftTypography sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.05rem' }}>{cm}</SoftTypography>
                                </Col>
                                <Col offset={1}>
                                    <SoftTypography sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.06rem' }}>{min}</SoftTypography>
                                </Col>
                                <Col offset={1}>
                                    <SoftTypography sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05rem' }}>{`${cn.slice(0, 8)}...`}</SoftTypography>
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

