/* eslint-disable react/jsx-filename-extension */
import { useCallback, useMemo } from "react";
import ListServiOrderByDate from '../BillAcordionContainer/funtiHelper';
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// Component
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Table as MuiTable } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableBody from "@mui/material/TableBody";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";


function BillAcordionRender() {
  const listServiceState = useSelector(state => state.listServiByCM);
  const { data: { data }, loading } = listServiceState; 


  let group = ListServiOrderByDate({ data });


  const renderAcordeonServiceByDate = useCallback(() => {
    return Object.keys(group).map((key) => {
      return (
        <Accordion key={uuidv4()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={key}
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
                  {group[key].map((row) => {
                    return (row);
                  }
                  )
                  }
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
