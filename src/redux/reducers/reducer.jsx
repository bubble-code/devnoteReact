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
    data: [],
    error: null,
    loading: false,
}
const initStateCurrentClToNote = {
    currentClient: {},
    error: null,
    loading: false,
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
                loading: true,
                data: [],
                error: null,
            };
        case "LIST_SERVICES_BY_CM_FAIL":
            return {
                loading: false,
                data: [],
                error: action.error,
            };
        case "LIST_SERVICES_BY_CM_SUCCESS":
            return {
                loading: false,
                data: action.value,
                error: null,
            };
        case "LIST_SERVICES_BY_CM_CM":
            return {
                loading: false,
                cm: action.cm,
                data: [],
                error: null,
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

export function listCMReducer(state = initialState, action) {
    // console.log('action', action);
    switch (action.type) {
        case "LIST_CM_LOAD":
            return {
                loading: true,
                data: [],
                error: null,
            };
        case "LIST_CM_FAIL":
            return {
                loading: false,
                data: [],
                error: action.error,
            };
        case "LIST_CM_SUCCESS":
            return {
                loading: false,
                data: action.value,
                error: null,
            };
        default:
            return state;
    }
}