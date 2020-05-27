import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import TechItem from './TechItem'

import { connect } from 'react-redux'
import { getTechs } from '../../actions/techActions'

const TechListModal = ({ tech: { techs, loading }, getTechs }) => {

  useEffect(() => {
    getTechs()
  //eslint-disable-next-line
  }, [])

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Technician List</h4>
        <ul className="collection">
        {
          !loading && techs !== null && techs.length !== 0 
          ? techs.map(tech => (<TechItem key={tech._id} tech={tech} />))
          : (<p className="center">No Technicians to Show! Add a New Technician</p>) 
        }
        </ul>
      </div>
    </div>
  )
}

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  tech: state.tech,
  getTechs: PropTypes.func.isRequired
})

export default connect(mapStateToProps, { getTechs } )(TechListModal)
