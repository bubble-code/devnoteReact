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

export function listServicesByCMReducer(state = initialState, action) {
    // console.log('action', action);
    switch (action.type) {
        case "LIST_BILLING_LOAD":
            return {
                loading: action.loading,
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