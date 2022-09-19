import { combineReducers } from 'redux'
import { listServicesByCMReducer, listNotesReducer, listServicesByCMReducer2 } from './reducers/reducer'

const rootReducer = combineReducers({
    listSbyCM: listServicesByCMReducer,
    search: listNotesReducer,
    listServiByCM: listServicesByCMReducer2,
});

export default rootReducer;