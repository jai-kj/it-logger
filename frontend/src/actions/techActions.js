import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from './types'

//Set Loading to True
export const setLoading = () => { 
  return {
    type: SET_LOADING
  }
}

//Load Technicians from JSON Server Api
export const getTechs = () => async dispatch => {
  try {
    setLoading()
    const res = await fetch('/api/techs')
    const data = await res.json()
    dispatch({
      type: GET_TECHS,
      payload: data
    })
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.data.msg
    })
  }
}

//Add New Technician to JSON Server API
export const addTech = (tech) => async dispatch => {
  try {
    setLoading()
    const res = await fetch('/api/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    dispatch({
      type: ADD_TECH,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.msg
    })
  }
}

//Delete Technician
export const deleteTech = (id) => async dispatch => {
  try {
    setLoading()
    await fetch(`/api/techs/${id}`, {
      method: 'DELETE',
    })
    dispatch({
      type: DELETE_TECH,
      payload: id
    })
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.msg
    })
  }
}