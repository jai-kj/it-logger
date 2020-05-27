import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TechSelectOptions from '../techs/TechSelectOptions'

import { connect } from 'react-redux'
import { updateLog, clearCurrent } from '../../actions/logActions'

import M from 'materialize-css/dist/js/materialize.min.js'

const EditLogModal = ({ log: { current } , updateLog, clearCurrent }) => {

  const [ message, setMessage ] = useState('')
  const [ attention, setAttention ] = useState(false)
  const [ tech, setTech ] = useState('')

  useEffect(() => {
    if(current) {
      setMessage(current.message)
      setAttention(current.attention)
      setTech(current.tech)
    }
  }, [current])

  const onSubmit = (e) => {
    e.preventDefault()
    if(message === '') {
      M.toast({ html: 'Please Enter a Message'})
    } else if(tech === '') {
      M.toast({ html: 'Please Enter a Technician'})
    } else {
      //Create new object to hold updated log
      const updatedLog = {
        _id: current._id,
        message,
        tech,
        attention,
        date: new Date()
      }

      //Update log 
      updateLog(updatedLog)
      M.toast({ html: `Log #${current._id} updated by ${tech}`})
      clearCurrent()

      //Clear Modal Form
      setMessage('')
      setTech('')
      setAttention(false)
    }
  }

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Update System Log</h4>

        {/* //Message Field */}
        <div className="row" style={{marginTop: '2rem'}}>
          <div className="input-field">
            <input 
              type="text" 
              name="message" 
              value={message} 
              onChange={e => setMessage(e.target.value)}
            />
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

EditLogModal.propTypes = {
  log: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  log: state.log
})

export default connect(mapStateToProps, { updateLog, clearCurrent })(EditLogModal)
