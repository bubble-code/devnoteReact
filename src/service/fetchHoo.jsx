import { async } from "@firebase/util";
import { Construction } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import DataService from './services'

export function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const listCm = await DataService.listCM();
            // console.log(total);
            const listBillings = Promise.all(listCm.map(async (cm) => {
                const objectReturn = {}
                const list = await DataService.listBillingOpenByCm({ cm: cm.id });
                let total = await DataService.totalUnits({ cm: "Raulito", day: "25-07-22" });
                objectReturn[cm.id] = list.length;
                objectReturn['total'] = total;
                return objectReturn;
            }))
            listBillings.then((list) => {
                setData(list);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
        } catch (error) {

        }
    }
    const fetchData = useCallback(() => {
        loadData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);



    return { data, loading, error };
}