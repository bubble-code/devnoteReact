/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

export function TagClientName({ name, id, ...rest }) {
  const { currentClient } = useSelector((state) => state.currentClToNote);
  const { id: idCurr } = currentClient;
  const shapeColor = id === idCurr ? 'green' : '#80808047';

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar alt={name} size="sm" variant="rounded" shapeColor={shapeColor} />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column" {...rest}>
        <SoftTypography variant="button" fontWeight="medium" >
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
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