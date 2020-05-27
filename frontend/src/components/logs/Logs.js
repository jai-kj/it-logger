import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getLogs } from '../../actions/logActions'

import LogItem from './LogItem'
import Preloader from '../layout/Preloader'

const Logs = ({ log: { logs, loading, filtered }, getLogs }) => {

  useEffect(() => {
    getLogs()
    //eslint-disable-next-line
  }, [])

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      { logs !== null && !loading
        ? logs.length === 0
          ? (<p className="center">No Logs to Show! Create a New log</p>)
          : filtered !== null && !loading
            ? filtered.length === 0
              ? (<p className="center">No Logs Found for the Search!</p>)
              : filtered.map(log => (<LogItem key={log._id} log={log} />))
            : logs.map(log => (<LogItem key={log._id} log={log} />)) 
        : <Preloader />
      }    
    </ul>
  )
}

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  log: state.log
})

export default connect( mapStateToProps, { getLogs } )(Logs)
