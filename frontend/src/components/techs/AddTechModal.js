import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addTech } from '../../actions/techActions'

import M from 'materialize-css/dist/js/materialize.min.js'

const AddTechModal = ({ addTech }) => {

  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if(firstName === '') {
      M.toast({ html: 'Please Enter the FirstName of Technician'})
    } else if(lastName === '') {
      M.toast({ html: 'Please Enter the LastName of Technician'})
    } else {
      
      //Add technician
      addTech({
        firstName,
        lastName
      })
      M.toast({ html: `${firstName} ${lastName} added as Technician` })

      //Clear Modal Form
      setFirstName('')
      setLastName('')
    }
  }

  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Technician</h4>

        {/* //FirstName Field */}
        <div className="row" style={{marginTop: '2rem'}}>
          <div className="input-field">
            <input 
              type="text" 
              name="firstName" 
              value={firstName} 
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName" className="active">Enter FirstName</label>
          </div>
        </div> 

        {/* //LastName Field */}
        <div className="row">
          <div className="input-field">
            <input 
              type="text" 
              name="lastName" 
              value={lastName} 
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="lastName" className="active">Enter LastName</label>
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

AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired
}

export default connect(null, { addTech })(AddTechModal)
