import { combineReducers } from 'redux'
import { listServicesByCMReducer, listNotesReducer, listServicesByCMReducer2, currentClToNoteReducer } from './reducers/reducer'

const rootReducer = combineReducers({
    listSbyCM: listServicesByCMReducer,
    search: listNotesReducer,
    listServiByCM: listServicesByCMReducer2,
    currentClToNote: currentClToNoteReducer,
});

export default rootReducer;