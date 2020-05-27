import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { deleteTech } from '../../actions/techActions'

import M from 'materialize-css/dist/js/materialize.min.js'

const TechItem = ({ tech, deleteTech }) => {
  
  const onTechDelete = () => {
    deleteTech(tech._id)
    M.toast({ html: `Technician ${tech.firstName} ${tech.lastName} was deleted`})
  }

  return (
    <li className="collection-item">
      <div>
        {tech.firstName} {tech.lastName}
        <a href="#!" className="secondary-content" onClick={onTechDelete}>
          <i className="material-icons delete-trash">delete</i>
        </a>
      </div>
    </li>
  )
}

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired
}

export default connect(null, { deleteTech })(TechItem)
