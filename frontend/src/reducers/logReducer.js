import {
  GET_LOGS, 
  LOGS_ERROR,
  SET_LOADING, 
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  CLEAR_LOGS,
  SEARCH_LOGS
} from '../actions/types'

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
  filtered: null
}

export default ( state = initialState, action ) => {
  switch(action.type){

    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      }

    case SET_LOADING:
      return {
        ...state,
        loading: true
      }

    case ADD_LOG: 
      return {
        ...state,
        logs: [ ...state.logs, action.payload ],
        loading: false
      }

    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload),
        loading: false
      }

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    
    case CLEAR_CURRENT:
      return{
        ...state,
        current: null
      }
    
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log => log._id === action.payload._id ? action.payload : log)
      }
    
    case SEARCH_LOGS:
      return {
        ...state,
        filtered: state.logs.filter(log => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return log.tech.match(regex) || log.message.match(regex) || log.date.match(regex)
        }) 
      }

    case CLEAR_LOGS:
      return {
        ...state,
        filtered: null,
        loading: false
      }

    case LOGS_ERROR:
      console.log("error -> action.payload", action.payload)
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default: 
      return state
  }
}