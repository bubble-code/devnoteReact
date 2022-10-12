/* eslint-disable react/jsx-filename-extension */
import moment from "moment";

// Component
import RowServiceComponet from "./RowServiceComponet";


function sortByDate(data) {
    const objectSort = {};
    Object.keys(data).sort((a, b) => moment(a, "DDMMYYYY").diff(moment(b, "DDMMYYYY"))).forEach((key) => {
        objectSort[key] = data[key].sort((a, b) => moment(a.timeStart, "HHmm").diff(moment(b.timeStart, "HHmm")));
    });
    return objectSort;
}


export default function ListServiOrderByDate({ data }) {
    const groupSort = sortByDate(data);
    const rows = [];

    Object.keys(groupSort).forEach((fecha) => {
        if (!rows[fecha]) {
            rows[fecha] = [];
        }
        groupSort[fecha].map(servicio => {
            rows[fecha].push(<RowServiceComponet service={servicio} />);

        });
    });
    return rows;
}
