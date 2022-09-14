/* eslint-disable react/prop-types */
import React from "react";
import { useEffect } from "react";
import { useSoftUIController } from "../../context/index";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import { Avatar } from "@mui/material";

export function TagClientName({ image, name, email, id }) {
  const [shColor, setShColor] = React.useState('#80808047');
  const [controler] = useSoftUIController();
  const { currentClToNote } = controler;
  useEffect(() => {
    const shapeColor = id === currentClToNote.id ? 'green' : '#80808047';
    setShColor(shapeColor);
  }, [currentClToNote.id]);

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" shapeColor={shColor} />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

export function Pos({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}