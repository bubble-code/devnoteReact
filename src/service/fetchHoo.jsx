import { useState, useEffect, useCallback, useContext } from "react";
import DataService from './services'
import { useSoftUIController, setListBilling, SoftUI } from "../context/index";

export function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const listCm = await DataService.listCM();
            const listBillings = Promise.all(listCm.map(async (cm) => {
                const objectReturn = {}
                const list = await DataService.listBillingOpenByCm({ cm: cm.id });
                objectReturn[cm.id] = list.length;
                objectReturn['pNumber'] = cm.data().pNumber;
                objectReturn['sCode'] = cm.data().sCode;
                console.log(cm.data().sCode);
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

export function useSaveNote() {
    const [datas, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const saveData = useCallback(async ({ cm, id, data }) => {
        setLoading(true);
        try {
            const request = await DataService.updateSerNote({ cm, id, data });
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { datas, loading, error, saveData };
}

export function useLoadSerOpen({ cmm }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [context, dispatch] = useContext(SoftUI);



    const loadData = useCallback(async () => {
        if (cmm) {
            setLoading(true);
            try {
                const list = await DataService.listBillingOpenByCm({ cm: cmm });
                setData(list);
                // setListBilling(dispatch, { [cmm]: list });
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        } else {
            setData([]);
        }
    }, [cmm]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return { data, loading, error, loadData };
}
export function useNotesByCliet({ cmm, client }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        if (cmm) {
            setLoading(true);
            try {
                const list = await DataService.listNoteByClient({ cm: cmm, name: client });
                setData(list);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        } else {
            setData([]);
        }
    }, [cmm, client]);
    useEffect(() => {
        loadData();
    }, [loadData]);

    return { data, loading, error };
}

export function useSearchHelperNotes() {
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        if (value.length > 4) {
            try {
                setLoading(true);
                const list = await DataService.searchHelper({ value });
                console.log(list);
                setData(list);
            } catch (error) {
                setError(error);
                setLoading(true);
            } finally {
                setLoading(false);
            }
        }
    }, [value]);

    useEffect(() => {
        if (value.length > 4) {
            loadData();
        }
    }, [loadData, value]);

    return { setValue, data, loading, error };
}