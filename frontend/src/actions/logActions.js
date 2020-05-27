import { 
  GET_LOGS,
  LOGS_ERROR,
  SET_LOADING,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
  CLEAR_LOGS
} from './types'

//Set Loading to True
export const setLoading = () => { 
  return {
    type: SET_LOADING
  }
}

//Get logs from Backend
export const getLogs = () => async dispatch => {
  try {
    setLoading()
    const res = await fetch('/api/logs')
    const data = await res.json()
    dispatch({
      type: GET_LOGS,
      payload: data
    })
  } catch (err) {
    console.log(err.response)
    dispatch({ 
      type: LOGS_ERROR, 
      payload: err.response.msg
    })
  }
}

//Add New Log to Backend
export const addLog = (log) => async dispatch => {
  try {
    setLoading()
    const res = await fetch('/api/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    dispatch({
      type: ADD_LOG,
      payload: data
    })
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.msg
    })
  }
}

//Delete log from Backend
export const deleteLog = (id) => async dispatch => {
  try {
    setLoading()
    await fetch(`/api/logs/${id}`, {
      method: 'DELETE',
    })
    dispatch({
      type: DELETE_LOG,
      payload: id
    })
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.msg
    })
  }
}

//Set Current log for editing
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log
  }
}

//Clear Current log from state
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  }
}

//Edit|Update a log to Backend
export const updateLog = (log) => async dispatch => {
  try {
    setLoading()
    const res = await fetch(`/api/logs/${log._id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    dispatch({
      type: UPDATE_LOG,
      payload: data
    })
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.msg
    })
  }
}

//Search Logs
export const searchLogs = (search) => {
  return{
    type: SEARCH_LOGS,
    payload: search
  }
}

//Clear Searched Logs
export const clearSearch = () => {
  return {
    type: CLEAR_LOGS
  }
}