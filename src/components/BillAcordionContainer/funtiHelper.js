/* eslint-disable react/jsx-filename-extension */
import moment from "moment";

import SoftBox from "components/SoftBox";
import SoftBadge from "components/SoftBadge";
import { columns } from "../BillAcordionRender/colunmHead";
import { TagClientName, Pos } from "../BillAcordionRender/TagClientName/TagClientName";
import SoftTypography from "components/SoftTypography";
import { IconButton, Tooltip } from "@mui/material";

import colors from "assets/theme/base/colors";
import { green, pink } from '@mui/material/colors';
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

import { DeleteRounded } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';



const { light } = colors;
const { size, fontWeightBold } = typography;
const { borderWidth } = borders;


export const renderColumns = columns.map(({ name, align, width }, key) => {
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
            width={width || "100%"}
            // pt={1.5}
            // pb={1.25}
            pl={align === "left" ? pl : 3}
            // pr={align === "right" ? pr : 3}
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

function sortByDate(data) {
    const objectSort = {};
    // const inSortObject = {};
    Object.keys(data).sort((a, b) => moment(a, "DDMMYYYY").diff(moment(b, "DDMMYYYY"))).forEach((key) => {
        // console.log("key", key);
        objectSort[key] = data[key].sort((a, b) => moment(a.timeStart, "HHmm").diff(moment(b.timeStart, "HHmm")));
    });
    // console.log("objectSort", objectSort);
    return objectSort;
}

function formatTime(time) {
    return moment(time, "HHmm").format("HH:mm A");
}

export default function ListServiOrderByDate({ data, handleDelete, handleEdit, setCurrentClForNote, setOpenModal }) {
    const groupSort = sortByDate(data);
    const rows = [];


    Object.keys(groupSort).forEach((fecha) => {
        if (!rows[fecha]) {
            rows[fecha] = [];
        }
        groupSort[fecha].map(servicio => {
            const { id, pos, description, timeEnd, timeStart, units, min, cm, cn } = servicio;
            // console.log("servicio", { id, pos, timeEnd, timeStart, units, min, cm, cn });
            rows[fecha].push({
                key: id,
                ClientName: <SoftBox onClick={() => setCurrentClForNote({ id, cm })} style={{ cursor: 'default' }}><TagClientName name={cn} id={id} opacity={1} /></SoftBox>,
                Pos: <SoftBox onClick={() => setCurrentClForNote({ id, cm })} style={{ cursor: 'default' }}>
                    <Pos job={pos} />
                </SoftBox>,
                ServiceDescription: (
                    <SoftBox onClick={() => setCurrentClForNote({ id, cm })} style={{ cursor: 'default' }}>
                        <SoftBadge variant="contained" badgeContent={Object.values(description).join(' / ')}
                            color="palettePastel" size="sm" container wordSpacing='0.1rem' />
                    </SoftBox>
                ),
                StartTime: (
                    <SoftTypography variant="caption" color="secondary"  alignItems='rigth'>
                        {formatTime(timeStart)}
                    </SoftTypography>
                ),
                EndTime: (
                    <SoftTypography variant="caption" color="secondary"  alignItems='rigth'>
                        {formatTime(timeEnd)}
                    </SoftTypography>
                ),
                Units: (
                    <SoftBadge variant="gradient" badgeContent={units} color="light"  container />
                ),
                Min: (
                    <SoftBadge variant="gradient" badgeContent={min} color="success" size="xs" container />
                ),
                CM: cm,
                Action: (
                    <SoftBox>
                        <Tooltip title="Edit"><IconButton>
                            <EditIcon sx={{ color: green[500], cursor: 'pointer' }} fontSize="small" onClick={() => setOpenModal({ id, cm })} />
                        </IconButton></Tooltip>
                        <Tooltip title="Delete"><IconButton>
                            <DeleteRounded sx={{ color: pink[500], cursor: 'pointer' }} fontSize="small" onClick={() => handleDelete({ id, cm })} />
                        </IconButton></Tooltip>
                    </SoftBox>
                ),
            });

        });
    });
    return rows;
}
