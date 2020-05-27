import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TechSelectOptions from '../techs/TechSelectOptions'

import { connect } from 'react-redux'
import { addLog } from '../../actions/logActions'

import M from 'materialize-css/dist/js/materialize.min.js'

const AddLogModal = ({ addLog }) => {

  const [ message, setMessage ] = useState('')
  const [ attention, setAttention ] = useState(false)
  const [ tech, setTech ] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if(message === '') {
      M.toast({ html: 'Please Enter a Message'})
    } else if(tech === '') {
      M.toast({ html: 'Please Enter a Technician'})
    } else {

      //Storing Present Data into a new log variable
      const newLog = {
        message,
        tech,
        attention,
        date: new Date()
      }

      //Adding Data to Logs
      addLog(newLog)
      M.toast({ html: `Log Added By ${tech}`})

      //Clear Modal Form
      setMessage('')
      setTech('')
      setAttention(false)
    }
  }

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>

        {/* //Message Field */}
        <div className="row" style={{marginTop: '2rem'}}>
          <div className="input-field">
            <input 
              type="text" 
              name="message" 
              value={message} 
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor="message" className="active">Log Message</label>
          </div>
        </div> 

        {/* //Technician Name Select */}
        <div className="row">
          <div className="input-field">
            <select 
              name="tech"
              value={tech}
              className="browser-default"
              onChange={e => setTech(e.target.value)}
            >
              <option value="" disabled>Select Technician</option>
              <TechSelectOptions />
            </select>
          </div>
        </div>

        {/* //Attention Checkbox */}
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input 
                  type="checkbox" 
                  name="tech" 
                  className="filled-in" 
                  checked={attention} 
                  value={attention} 
                  onChange={e => setAttention(!attention)}
                />
              <span className={attention ? 'red-text' : null}>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>

      {/* //Submit Button */}
      <div className="modal-footer center">
        <a href="#!" onClick={onSubmit} className="modal-close waves-effect blue btn">Enter</a>
      </div>

    </div>
  )
}

const modalStyle = {
  width: '75%',
  height: '75%'
}

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired
}

export default connect(null, { addLog })(AddLogModal)
