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
import { useSelector } from "react-redux";
import renderByDate from './funct/funtiHelper';
import { columns } from "../../../components/TableBillingService/colunmHead";

function Table({ onClientClick }) {
  const listServiceState = useSelector(state => state.listServiByCM);
  const { data, loading } = listServiceState;


  const renderAcordeonServiceByDate = useCallback(() => {
    const group = renderByDate(data);
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

                    return <TableRow key={rowKey} onClick={() => onClientClick({ id: rowKey, cmm: caseM })} >{tableRow}</TableRow>;
                  })}
                </TableBody>
              </MuiTable>
            </SoftBox>
          </AccordionDetails>
        </Accordion>
      );
    });
  }, [data, onClientClick]);
  return useMemo(
    () => (
      <SoftBox>
        {loading && <SoftBox display='flex' justifyContent='center' alignItems='center' mt={7} > <CircularProgress /></SoftBox>}
        {!data.length && <SoftBox display='flex' justifyContent='center' alignItems='center' mt={7} > <SoftTypography variant="h6" fontWeight="medium" opacity={0.5}>No Data</SoftTypography></SoftBox>}
        <SoftBox px={2}>
          {renderAcordeonServiceByDate()}
        </SoftBox>
      </SoftBox>
    ),
    [data.length, loading, renderAcordeonServiceByDate]
  );
}

// Typechecking props for the Table
Table.propTypes = {
  onClientClick: PropTypes.func.isRequired,
};

export default Table;
