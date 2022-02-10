import { types } from '../types/types';

const initialState = {
    notes: [],
    active: null
}

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActiveEntry:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            };
        case types.notesAddEntry:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case types.notesLoadEntry:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdEntry:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }
        case types.notesDelEntry:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case types.notesLogoutClean:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}