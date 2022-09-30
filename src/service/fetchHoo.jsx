import { useState, useEffect, useCallback, useRef, useReducer } from "react";
import DataService from './services';
import { useDispatch } from 'react-redux';
import { setListBillingLoad, setListBillingSuccess } from '../redux/actions/actions'
// import { listNotesReducer } from '../redux/reducers/reducer';
// import {} from 'firebase/firestore';


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
                // console.log(cm.data().sCode);
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
export function useListCLients() {
    const [lisClients, setListClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async ({ cm }) => {
        if (!cm) return;
        setLoading(true);
        try {
            const list = await DataService.listClient({ cm });
            // console.log('list', list);
            setListClients(list);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);


    return { lisClients, loading, error, loadData };
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

export function useSearchHelperNotes(query) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const list = await DataService.searchHelper({ value: query });
            setData(list);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        if (query.length > 2) {
            loadData();
        }
    }, [loadData, query.length]);

    return { data, loading, error };

}
export function useDeleteService() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const delteItem = useCallback(async ({ cm, id }) => {
        setLoading(true);
        try {
            const list = await DataService.deleteService({ cm, id });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, delteItem };

}

export function useAddClient() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addClient = async ({ cm, data }) => {
        setLoading(true);
        try {
            await DataService.addNewClient({ cm, data });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, addClient };
}

export function useAddDxCode() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addDxCode = async ({ dxCode }) => {
        setLoading(true);
        try {
            await DataService.addNewDxCode({ dxData: dxCode });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, addDxCode };
}
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
function useFirestoreQuery(query) {
    // Our initial state
    // Start with an "idle" status if query is falsy, as that means hook consumer is
    // waiting on required data before creating the query object.
    // Example: useFirestoreQuery(uid && firestore.collection("profiles").doc(uid))
    const initialState = {
        status: query ? "loading" : "idle",
        data: undefined,
        error: undefined,
    };
    // Setup our state and actions
    const [state, dispatch] = useReducer(reducer, initialState);
    // Get cached Firestore query object with useMemoCompare (https://usehooks.com/useMemoCompare)
    // Needed because firestore.collection("profiles").doc(uid) will always being a new object reference
    // causing effect to run -> state change -> rerender -> effect runs -> etc ...
    // This is nicer than requiring hook consumer to always memoize query with useMemo.
    const queryCached = useMemoCompare(query, (prevQuery) => {
        // Use built-in Firestore isEqual method to determine if "equal"
        return prevQuery && query && query.isEqual(prevQuery);
    });
    useEffect(() => {
        // Return early if query is falsy and reset to "idle" status in case
        // we're coming from "success" or "error" status due to query change.
        if (!queryCached) {
            dispatch({ type: "idle" });
            return;
        }
        dispatch({ type: "loading" });
        // Subscribe to query with onSnapshot
        // Will unsubscribe on cleanup since this returns an unsubscribe function
        return queryCached.onSnapshot(
            (response) => {
                // Get data for collection or doc
                const data = response.docs
                    ? getCollectionData(response)
                    : getDocData(response);
                dispatch({ type: "success", payload: data });
            },
            (error) => {
                dispatch({ type: "error", payload: error });
            }
        );
    }, [queryCached]); // Only run effect if queryCached changes
    return state;
}
// Get doc data and merge doc.id
function getDocData(doc) {
    return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}
// Get array of doc data from collection
function getCollectionData(collection) {
    return collection.docs.map(getDocData);
}
// -----------------------------------------------------------
function useMemoCompare(next, compare) {
    // Ref for storing previous value
    const previousRef = useRef();
    const previous = previousRef.current;
    // Pass previous and next value to compare function
    // to determine whether to consider them equal.
    const isEqual = compare(previous, next);
    // If not equal update previousRef to next value.
    // We only update if not equal so that this hook continues to return
    // the same old value if compare keeps returning true.
    useEffect(() => {
        if (!isEqual) {
            previousRef.current = next;
        }
    });
    // Finally, if equal then return the previous value
    return isEqual ? previous : next;
}

