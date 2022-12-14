const initialState = {
    loading: false,
    data: [],
    error: null,
};

const initialStateSearch = {
    status: 'idle',
    data: [],
    error: null,
}
const initialStateLisServices = {
    cm: '',
    data: { initialData: {}, data: {}, cWithBill: [] },
    error: null,
    loading: false,
}
const initStateCurrentClToNote = {
    currentClient: {},
    error: null,
    loading: false,
};
const initStateListCM = {
    listCMs: [],
    error: null,
    loading: false,
};

const initialStateListClientsByCM = {
    listClients: [],
    loading: false,
    error: null,
}

const initialStateHistoryOfClient = {
    data: [],
    loading: false,
    error: null,
    search: [],
}
const initialDataAddClient = {
    loading: false,
    error: null,
};

export function listServicesByCMReducer(state = initialState, action) {
    // console.log('action', action);
    switch (action.type) {
        case "LIST_BILLING_LOAD":
            return {
                loading: true,
                data: [],
                error: null,
            };
        case "LIST_BILLING_FAIL":
            return {
                loading: false,
                data: [],
                error: action.error,
            };
        case "LIST_BILLING_SUCCESS":
            return {
                loading: false,
                data: action.value,
                error: null,
            };
        default:
            return state;
    }
}

export function listNotesReducer(state = initialState, action) {
    // console.log('action', action);
    switch (action.type) {
        case "idle":
            return { status: "idle", data: '', error: undefined };
        case "loading":
            return { status: "loading", data: undefined, error: undefined };
        case "success":
            return { status: "success", data: action.payload, error: undefined };
        case "error":
            return { status: "error", data: undefined, error: action.payload };
        default:
            return state;
    }
}

export function listServicesByCMReducer2(state = initialStateLisServices, action) {
    // console.log('action', action);
    switch (action.type) {
        case "LIST_SERVICES_BY_CM_LOAD":
            return {
                ...state,
                loading: true,
                cm: action.cm,
            };
        case "LIST_SERVICES_BY_CM_FAIL":
            return {
                ...state,
                error: action.error,
            };
        case "LIST_SERVICES_BY_CM_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.value,
                error: null,
            };
        case "LIST_SERVICES_BY_CM_UPDATE": {
            const { fecha, id } = action.value;
            const subArrayFind = state.data.data[fecha];
            const index = subArrayFind.findIndex((item) => item.id === id);
            subArrayFind[index] = { ...subArrayFind[index], ...action.value };

            return {
                ...state,
                data: {
                    ...state.data,
                    data: {
                        ...state.data.data,
                        [fecha]: subArrayFind,
                    },
                    initialData: {
                        ...state.data.initialData,
                        [fecha]: subArrayFind,
                    },
                },
            };
        }
        case "LIST_SERVICES_BY_CM_COMPLETE": {
            const { fecha, id } = action.value;
            const subArrayFind = state.data.data[fecha];
            const index = subArrayFind.findIndex((item) => item.id === id);
            // delete object subArrayFind[index] from array and update state
            subArrayFind.splice(index, 1);
            // subArrayFind[index] = { ...subArrayFind[index], ...action.value };

            return {
                ...state,
                data: {
                    ...state.data,
                    data: {
                        ...state.data.data,
                        [fecha]: subArrayFind,
                    },
                    initialData: {
                        ...state.data.initialData,
                        [fecha]: subArrayFind,
                    },
                },
            };
        }
        case "LIST_SERVICES_BY_CM_CLEAR":
            return {
                ...initialStateLisServices
            };
        default:
            return state;
    }
}
export function currentClToNoteReducer(state = initStateCurrentClToNote, action) {
    // console.log('action', action);
    switch (action.type) {
        case "CURRENT_CL_TO_NOTE_LOAD":
            return {
                loading: true,
                currentClient: {},
                error: null,
            };
        case "CURRENT_CL_TO_NOTE_FAIL":
            return {
                loading: false,
                currentClient: {},
                error: action.error,
            };
        case "CURRENT_CL_TO_NOTE_SUCCESS":
            return {
                loading: false,
                currentClient: action.value,
                error: null,
            };
        default:
            return state;
    }
}

export function listCMReducer(state = initStateListCM, action) {
    // console.log('action', action);
    switch (action.type) {
        case "LIST_CM_LOAD":
            return {
                loading: true,
                listCMs: [],
                error: null,
            };
        case "LIST_CM_FAIL":
            return {
                loading: false,
                listCMs: [],
                error: action.error,
            };
        case "LIST_CM_SUCCESS":
            return {
                loading: false,
                listCMs: action.value,
                error: null,
            };
        default:
            return state;
    }
}

export function listClientsByCMReducer(state = initialStateListClientsByCM, action) {
    // console.log('action', action);
    switch (action.type) {
        case "LIST_CLIENTS_BY_CM_LOAD":
            return {
                loading: true,
                listClients: [],
                error: null,
            };
        case "LIST_CLIENTS_BY_CM_FAIL":
            return {
                loading: false,
                listClients: [],
                error: action.error,
            };
        case "LIST_CLIENTS_BY_CM_SUCCESS":
            return {
                loading: false,
                listClients: action.value,
                error: null,
            };
        default:
            return state;
    }
}

export function historyOfClientReducer(state = initialStateHistoryOfClient, action) {
    // console.log('action', action);
    switch (action.type) {
        case "HISTORY_CLIENT_LOAD":
            return {
                ...state,
                loading: true,
            };
        case "HISTORY_CLIENT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case "HISTORY_CLIENT_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.value,
                error: null,
            };
        case "SEARCH_LOAD":
            return {
                ...state,
                loading: true,
            };
        case "SEARCH_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case "SEARCH_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                search: action.value,
            };
        default:
            return state;
    }
}

export function ClientReducer(state = initialDataAddClient, action) {
    // console.log('action', action);
    switch (action.type) {
        case "ADD_CLIENT_LOAD":
            return {
                loading: true,
                error: null,
            };
        case "ADD_CLIENT_FAIL":
            return {
                loading: false,
                error: action.error,
            };
        case "ADD_CLIENT_SUCCESS":
            return {
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}