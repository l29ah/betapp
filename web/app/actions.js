export const SIGN_IN = 'SIGN_IN';
export const OPEN_NEW_BET_FORM = 'OPEN_NEW_BET_FORM';
export const CANCEL_NEW_BET_FORM = 'CANCEL_NEW_BET_FORM';

export function signIn() {
  return {
    type: SIGN_IN
  }
};

export function openNewBetForm() {
  return {
    type: OPEN_NEW_BET_FORM
  }
};

export function cancelNewBetForm() {
  return {
    type: CANCEL_NEW_BET_FORM
  }
};

export const REMOVE_BET = 'REMOVE_BET';
export function removeBet(id) {
  id = parseInt(id);
  return function(dispatch) {
    dispatch({
      type: REMOVE_BET
    });

    return fetch(`http://localhost:8000/api/bets/${id}?format=json`, {
      method: 'DELETE',
    })
    .then(
      () =>
      dispatch(fetchBets())
    )
  };
};

export const FETCH_BETS = 'FETCH_BETS';
export function fetchBets() {
  return function(dispatch) {
    dispatch({
      type: FETCH_BETS,
      status: 'initiated',
    });

    return fetch('http://localhost:8000/api/bets/?format=json')
    .then(response => response.json())
    .then(
      json =>
      dispatch({
        type: FETCH_BETS,
        status: 'success',
        bets: json,
      })
    )
  };
};

export const SUBMIT_NEW_BET = 'SUBMIT_NEW_BET';
export function submitNewBet(title) {
  return function(dispatch) {
    dispatch({
      type: SUBMIT_NEW_BET,
      status: 'initiated',
    });
    return fetch('http://localhost:8000/api/bets/?format=json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
      })
    })
    .then(response => response.json())
    .then(json => {
      dispatch(fetchBets())
      .then(
        () =>
        dispatch({
          type: SUBMIT_NEW_BET,
          status: 'success',
        })
      )
    })
  };
};