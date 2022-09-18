/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MuiTable from "@mui/material/Table";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { v4 as uuidv4 } from "uuid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { column } from './colomn'
import DataService from "../../../../service/services";
import { useSoftUIController } from "../../../../context/index";
import { useNotesByCliet } from '../../../../service/fetchHoo'
import { useSelector } from 'react-redux'




function TablesSearchRender() {
    const stateSearch = useSelector(state => state.search);
    const dataSearch = stateSearch.data;
    // console.log('stateSearch', stateSearch);
    const { light } = colors;
    const { size, fontWeightBold } = typography;
    const { borderWidth } = borders;
    // const [billingData, setBillingData] = useState([]);
    // const [controler, dispatch] = useSoftUIController();
    // const { currentClToNote } = controler;
    const renderColumns = column.map(({ name, align, width }, key) => {
        let pl;
        let pr;

        if (key === 0) {
            pl = 3;
            pr = 3;
        } else if (key === column.length - 1) {
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
    // const { cn, cm } = currentClToNote;
    // const { data, loading, error } = useNotesByCliet({ cmm: cm, client: cn });
    let rows = [];
    dataSearch.forEach((item) => {
        rows.push({
            description: (
                <SoftBox bgColor='grey-400' borderRadius='md' px={1} display='flex' justifyContent='space-between' sx={{ width: '550px' }} >
                    <SoftBox>
                        <SoftTypography variant="caption" color='black' mr={1}>{item.fecha}</SoftTypography>
                    </SoftBox>
                    <SoftBox>
                        <SoftTypography variant="caption" color='black' >{Object.values(item.description).join(' / ')}</SoftTypography>
                    </SoftBox>
                    <SoftBox>
                        <SoftTypography variant="caption" color='black'>{item.cm}</SoftTypography>
                    </SoftBox>
                    <SoftBox>
                        <SoftTypography variant="caption" color='black'>{item.cn}</SoftTypography>
                    </SoftBox>
                </SoftBox>
            ),
        });
        rows.push({
            description: (
                <SoftBox container>
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth' >
                        {item.sNote}
                    </SoftTypography>
                </SoftBox>
            ),
        });
    });
    const renderRows = rows.map((row, key) => {
        const rowKey = row['key'];
        const caseM = row['CM'];
        // const rowKey = `row-${key}`;

        const tableRow = column.map(({ name, align }) => {
            let template;
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

            return template;
        });

        return <TableRow key={rowKey}>{tableRow}</TableRow>;
    });



    return (
        <TableContainer sx={{ minHeight: 200 }}>
            <MuiTable>
                <SoftBox component="thead">
                    <TableRow>{renderColumns}</TableRow>
                </SoftBox>
                <TableBody>{renderRows}</TableBody>
            </MuiTable>
        </TableContainer>
    );
}

// Setting default values for the props of Table
TablesSearchRender.defaultProps = {
    columns: [],
    rows: [{}],
};

// Typechecking props for the Table
TablesSearchRender.propTypes = {
    columns: PropTypes.node,
    rows: PropTypes.arrayOf(PropTypes.object),
}

export default TablesSearchRender;
