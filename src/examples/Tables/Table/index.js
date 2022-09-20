/* eslint-disable react/jsx-filename-extension */
import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress, Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { TagClientName } from "components/TableBillingService/TagClientName";
import { Pos } from "components/TableBillingService/TagClientName";
import SoftBadge from "components/SoftBadge";
import { useSelector } from "react-redux";
import { columns } from "../../../components/TableBillingService/colunmHead";

function Table({ onClientClick }) {
  const listServiceState = useSelector(state => state.listServiByCM);
  const { data, loading } = listServiceState;
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  let rows = data.map((item) => {
    const data = item.data();
    const row = {
      key: item.id,
      ClientName: <TagClientName name={data.cn} id={item.id} opacity={1} />,
      Pos: <Pos job={data.pos} />,
      ServiceDescription: (
        <SoftBadge variant="contained" badgeContent={Object.values(data.description).join(' / ')}
          color="palettePastel" size="sm" container wordSpacing='0.1rem' />
      ),
      StartTime: (
        <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
          {data.timeStart}
        </SoftTypography>
      ),
      EndTime: (
        <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
          {data.timeEnd}
        </SoftTypography>
      ),
      Units: (
        <SoftBadge variant="gradient" badgeContent={data.units} color="light" size="xl" container />
      ),
      Min: (
        <SoftBadge variant="gradient" badgeContent={data.min} color="success" size="xs" container />
      ),
      CM: data.cm,
    };
    return row;
  });

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SoftBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={1}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SoftBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = row['key'];
    const caseM = row['CM'];

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
              <SoftBox mr={2}>
                <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </SoftBox>
              <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        );
      } else {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
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
      }

      return template;
    });

    return <TableRow key={rowKey} onClick={() => onClientClick({ id: rowKey, cmm: caseM })} >{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer sx={{ minHeight: 200 }}>
        <MuiTable>
          <SoftBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SoftBox>
          {loading ? <TableBody></TableBody> : <TableBody>{renderRows}</TableBody>}
        </MuiTable>
        {loading && <SoftBox display='flex' justifyContent='center' alignItems='center' mt={7} > <CircularProgress /></SoftBox>}
        {!data.length && <SoftBox display='flex' justifyContent='center' alignItems='center' mt={7} > <SoftTypography variant="h6" fontWeight="medium" opacity={0.5}>No Data</SoftTypography></SoftBox>}
      </TableContainer>
    ),
    [loading, data.length, renderColumns, renderRows]
  );
}

// Typechecking props for the Table
Table.propTypes = {
  onClientClick: PropTypes.func.isRequired,
};

export default Table;
