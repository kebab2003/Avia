const fetchAllTickets = async (searchId, dispatch) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    const data = await response.json();

    dispatch({ type: 'ADD_TICKETS', payload: data.tickets });

    if (!data.stop) {
      await fetchAllTickets(searchId, dispatch);
    }
  } catch (err) {
    await fetchAllTickets(searchId, dispatch);
  }
};

const fetchTickets = () => async (dispatch) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });

    const searchRes = await fetch('https://aviasales-test-api.kata.academy/search');
    const { searchId } = await searchRes.json();

    dispatch({ type: 'SET_SEARCH_ID', payload: searchId });

    await fetchAllTickets(searchId, dispatch);

    dispatch({ type: 'SET_LOADING', payload: false });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export default fetchTickets;
