/* eslint-disable react/jsx-filename-extension */
import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Table as MuiTable } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import { columns } from "../BillAcordionRender/colunmHead";

function BillAcordionRender({ group, loading }) {
  // console.log("group", !!group);
  // console.log("len", group);

  const renderAcordeonServiceByDate = useCallback(() => {
    return Object.keys(group).map((key) => {
      return (
        <Accordion key={uuidv4()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <SoftBox display="flex" alignItems="center" color="palettePastel" size="sm" container wordSpacing='0.1rem' >
              <SoftBadge variant="contained" badgeContent={key} color="palettePastel" size="sm" container wordSpacing='0.1rem' />
              <SoftBadge
                badgeContent={group[key].length}
                color="error"
              // variant="dot"
              />
            </SoftBox>
          </AccordionSummary>
          <AccordionDetails>
            <SoftBox>
              <MuiTable size="small">
                <SoftBox component="thead">
                </SoftBox>
                <TableBody>
                  {group[key].map((row, key) => {
                    const rowKey = row['key'];
                    const caseM = row['CM'];
                    const tableRow = columns.map(({ name, align }) => {
                      return (
                        <SoftBox
                          key={uuidv4()}
                          component="td"
                          p={1}
                          textAlign={align}
                          borderBottom={null}
                        >
                          <SoftTypography
                            variant="button"
                            fontWeight="regular"
                            color="secondary"
                            sx={{ display: "inline-block", width: "max-content" }}
                          >
                            {row[name]}
                          </SoftTypography>
                        </SoftBox>
                      );
                    });

                    return <TableRow key={rowKey} >{tableRow}</TableRow>;
                  })}
                </TableBody>
              </MuiTable>
            </SoftBox>
          </AccordionDetails>
        </Accordion>
      );
    });
  }, [group]);
  return useMemo(
    () => (
      <SoftBox>
        {
          loading ?
            <SoftBox display='flex' justifyContent='center' alignItems='center' mt={7} > <CircularProgress /></SoftBox>
            : !!group ?
              <SoftBox px={2}> {renderAcordeonServiceByDate()} </SoftBox>
              : <SoftBox display='flex' justifyContent='center' alignItems='center' mt={7} > <SoftTypography variant="h6" fontWeight="medium" opacity={0.5}>No Data</SoftTypography></SoftBox>
        }
      </SoftBox>
    ),
    [group, loading, renderAcordeonServiceByDate]
  );
}

export default BillAcordionRender;
