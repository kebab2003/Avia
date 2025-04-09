import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

const initialState = {
  tickets: [],
  searchId: null,
  loading: false,
  error: null,
};

function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SEARCH_ID':
      return { ...state, searchId: action.payload };
    case 'ADD_TICKETS':
      return { ...state, tickets: [...state.tickets, ...action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
