import { combineReducers } from 'redux'
import { listServicesByCMReducer, listNotesReducer } from './reducers/reducer'

const rootReducer = combineReducers({
    listSbyCM: listServicesByCMReducer,
    search: listNotesReducer,
});

export default rootReducer;