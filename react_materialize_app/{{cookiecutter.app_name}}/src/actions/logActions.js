import {
  GET_LOGS,
  ADD_LOG,
  SET_LOADING,
  DELETE_LOG,
  LOGS_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from './types';

// Redux-thunk allows us to return a function, so we can do async stuff
export const getLogs = () => async (dispatch, getState) => {
  try {
    setLoading();
    const res = await fetch('/logs');
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add new log
export const addLog = (log) => async (dispatch, getState) => {
  try {
    setLoading();

    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete log from server
export const deleteLog = (id) => async (dispatch, getState) => {
  try {
    setLoading();
    await fetch(`/logs/${id}`, { method: 'DELETE' });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Update log on server
export const updateLog = (log) => async (dispatch, getState) => {
  try {
    setLoading();
    const res = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Redux-thunk allows us to return a function, so we can do async stuff
export const searchLogs = (query) => async (dispatch, getState) => {
  try {
    setLoading();
    const res = await fetch(`/logs?q=${query}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set current log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};
// Set current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
