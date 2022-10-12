import React from "react";
import { useDispatch } from "react-redux";
import { useSoftUIController, setOpenModalEditService } from "../../context/index";
import { deleteNote } from '../../redux/actions/actions';
import moment from 'moment';
import PropTypes from "prop-types";

// Component
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { IconButton, Tooltip } from "@mui/material";
import { TagClientName, Pos } from "components/BillAcordionRender/TagClientName/TagClientName";
import { DeleteRounded } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { green, pink } from '@mui/material/colors';
import { Col, Row } from "antd";
import { EyeOutlined } from '@ant-design/icons';



function RowServiceComponet({ service }) {
    const dispatchRedux = useDispatch();
    const [controller, dispatch] = useSoftUIController();
    const { id, pos, description, timeEnd, timeStart, units, min, cm, cn, isInProcess = false } = service;

    const setCurrentClForNote = ({ service }) => {
        dispatchRedux({ type: 'CURRENT_CL_TO_NOTE_SUCCESS', value: service });
    };

    function handleOpen({ service }) {
        setOpenModalEditService(dispatch, { open: true, service });
    }

    function formatTime(time) {
        return moment(time, "HHmm").format("HH:mm A");
    }
    function handleDelete({ id, cm }) {
        dispatchRedux(deleteNote({ value: { ...service, id, cm } }));
    };

    return (
        <Row>
            <Col span={24}>
                <Row gutter={[0, 24]} >
                    <Col style={{ cursor: 'default' }} span={4}>
                        <TagClientName onClick={() => setCurrentClForNote({ service: service })} name={cn} id={id} opacity={1} style={{ cursor: 'pointer' }} isInProcess={isInProcess} />
                    </Col>
                    <Col onClick={() => setCurrentClForNote({ service })} style={{ cursor: 'pointer' }} span={1}>
                        <Pos job={pos} />
                    </Col>
                    <Col span={11} style={{ cursor: 'pointer' }}>
                        <SoftBadge variant="contained" badgeContent={Object.values(description).join(' / ')} onClick={() => setCurrentClForNote({ service })}
                            color="palettePastel" size="sm" container wordSpacing='0.1rem' />
                    </Col>
                    <Col span={2}>
                        <SoftTypography variant="caption" color="secondary" alignItems='rigth'>
                            {formatTime(timeStart)}
                        </SoftTypography>
                    </Col>
                    <Col span={2}>
                        <SoftTypography variant="caption" color="secondary" alignItems='rigth'>
                            {formatTime(timeEnd)}
                        </SoftTypography>
                    </Col>
                    <Col span={1}>
                        <SoftBadge variant="gradient" badgeContent={units} color="light" container />
                    </Col>
                    <Col span={1}>
                        <SoftBadge variant="gradient" badgeContent={min} color="success" size="xs" container />
                    </Col>
                    <Col span={1}>
                        <Tooltip title="Edit"><IconButton>
                            <EditIcon sx={{ color: green[500], cursor: 'pointer' }} fontSize="small" onClick={() => handleOpen({ service })} />
                        </IconButton></Tooltip>
                    </Col>
                    <Col span={1}>
                        <Tooltip title="Delete"><IconButton>
                            <DeleteRounded sx={{ color: pink[500], cursor: 'pointer' }} fontSize="small" onClick={() => handleDelete({ id, cm })} />
                        </IconButton></Tooltip>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default RowServiceComponet;

RowServiceComponet.propTypes = {
    service: PropTypes.object.isRequired,
};