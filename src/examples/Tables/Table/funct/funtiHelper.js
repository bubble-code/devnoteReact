/* eslint-disable react/jsx-filename-extension */
import SoftBox from "components/SoftBox";
import { columns } from "../../../../components/TableBillingService/colunmHead";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { TagClientName } from "components/TableBillingService/TagClientName";
import { Pos } from "components/TableBillingService/TagClientName";
import SoftBadge from "components/SoftBadge";
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { pink } from '@mui/material/colors';
import SoftTypography from "components/SoftTypography";
import moment from "moment";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { fectCurrentClToNote } from "../../../../redux/actions/actions";
import { useDeleteService } from '../../../../service/fetchHoo'



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

function groupByDate(data) {
    return data.reduce((acc, cur) => {
        const id = cur.id;
        const { fecha } = cur.data();
        if (!acc[fecha]) {
            acc[fecha] = [];
        }
        acc[fecha].push({ id, ...cur.data() });
        return acc;
    }, {});
}

function sortByDate(data) {
    const objectSort = {};
    Object.keys(data).sort((a, b) => moment(a, "DDMMYYYY").diff(moment(b, "DDMMYYYY"))).forEach((key) => {
        objectSort[key] = data[key];
    });
    return objectSort;
}


function sortByTime(data) {
    const objectSort = {};
    Object.keys(data).forEach((key) => {
        objectSort[key] = data[key].sort((a, b) => moment(a.timeStart, "HHmm").diff(moment(b.timeStart, "HHmm")));
    });
    return objectSort;

}

function formatTime(time) {
    return moment(time, "HHmm").format("HH:mm A");
}

function useDeleteServiceFromTable({ id, cm }) {
    const dispatchRedux = useDispatch();
    console.log({ id, cm });
    const { error, delteItem, loading: load } = useDeleteService();
    delteItem({ id, cm });
    if (!error) {
        dispatchRedux(fectCurrentClToNote({ cm, id }));
    }
}
export default function useRenderByDate({ data, handleDelete }) {
    const dispatchRedux = useDispatch();
    const group = groupByDate(data);
    const sort = sortByDate(group)
    const groupSort = sortByTime(sort);
    const rows = [];

    const setCurrentClForNote = ({ id, cm }) => {
        dispatchRedux(fectCurrentClToNote({ cm, id }));
    };

    Object.keys(groupSort).forEach((fecha) => {
        if (!rows[fecha]) {
            rows[fecha] = [];
        }
        // console.log('fecha', fecha);
        groupSort[fecha].map(servicio => {
            // console.log("servicio", servicio);
            const { id, pos, description, timeEnd, timeStart, units, min, cm, cn } = servicio;
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
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
                        {formatTime(timeStart)}
                    </SoftTypography>
                ),
                EndTime: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
                        {formatTime(timeEnd)}
                    </SoftTypography>
                ),
                Units: (
                    <SoftBadge variant="gradient" badgeContent={units} color="light" size="xl" container />
                ),
                Min: (
                    <SoftBadge variant="gradient" badgeContent={min} color="success" size="xs" container />
                ),
                CM: cm,
                Action: (<Tooltip title="Delete"><IconButton>
                    <DeleteRounded sx={{ color: pink[500], cursor: 'pointer' }} fontSize="small" onClick={() => handleDelete({ id, cm })} />
                </IconButton></Tooltip>
                ),
            });

        });
    });
    return rows;
}
