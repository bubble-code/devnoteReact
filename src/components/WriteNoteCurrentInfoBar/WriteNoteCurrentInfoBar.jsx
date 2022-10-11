import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

// Component
import { Row, Col, Divider } from 'antd';
import SoftBadge from "components/SoftBadge";


function WriteNoteCurrentInfoBar(props) {
    const clientFromRedux = useSelector((state) => state.currentClToNote);
    const { currentClient: currentClToNote } = clientFromRedux;
    // console.log('currentClToNote', currentClToNote);
    const stringTime = currentClToNote.timeStart ? moment(currentClToNote.timeStart, "HHmm").format("HH:mm A") : null;
    const stringTimeEnd = currentClToNote.timeEnd ? moment(currentClToNote.timeEnd, "HHmm").format("HH:mm A") : null;

    return (
        <Row gutter={16} >
            <Col >
                <SoftBadge variant="contained" badgeContent={currentClToNote.cn}
                    color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Col>
            <Col >
                <SoftBadge variant="contained" badgeContent={currentClToNote.pos}
                    color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Col>
            <Col>
                <SoftBadge variant="contained" badgeContent={currentClToNote.fecha}
                    color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Col>
            <Col>
                <SoftBadge variant="contained" badgeContent={stringTime}
                    color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Col>
            <Col>
                <SoftBadge variant="contained" badgeContent={stringTimeEnd}
                    color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Col>
            <Col>
                <SoftBadge variant="contained" badgeContent={`${currentClToNote.min} min`}
                    color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Col>
            <Col>
                <SoftBadge variant="contained" badgeContent={currentClToNote.units}
                    color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Col>
            <Col container sm={1}>
                <Divider orientation={"vertical"} sx={{ "& .MuiDivider-root": { background: 'black !important' }, mt: 1, mb: 1, opacity: 1 }} />
            </Col>
        </Row>
    );
}

export default WriteNoteCurrentInfoBar;