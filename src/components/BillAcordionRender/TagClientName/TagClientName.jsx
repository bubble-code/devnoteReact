/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Col, Row } from "antd";

export function TagClientName({ name, id, isInProcess = false, ...rest }) {
  const { currentClient } = useSelector((state) => state.currentClToNote);
  const { id: idCurr } = currentClient;
  const shapeColor = id === idCurr ? 'green' : '#80808047';

  return (
    <Row gutter={[0, 24]}>
      <Col span={4}>
        <SoftAvatar alt={name} size="sm" variant="rounded" shapeColor={shapeColor} />
      </Col>
      <Col span={12} {...rest}>
        <SoftTypography variant="button" fontWeight="medium" >
          {name}
        </SoftTypography>
      </Col>
      {<SoftBox ml={1} color={isInProcess ? "success" : "error"}><RemoveRedEyeOutlinedIcon /></SoftBox>}
    </Row>
  );
}

export function Pos({ job }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
    </SoftBox>
  );
}