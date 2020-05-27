import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getTechs } from '../../actions/techActions'

const TechSelectOptions = ({ tech: { techs, loading }, getTechs }) => {

  useEffect(() => {
    getTechs()
  // eslint-disable-next-line
  }, [])

  return (!loading && techs !== null 
    ? techs.length === 0 
      ? (<option disabled>No Technicians Found</option>)
      : (techs.map(tech => (<option key={tech._id}>{tech.firstName} {tech.lastName}</option>)))
    : null
  )
}

TechSelectOptions.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tech: state.tech
})

export default connect(mapStateToProps, { getTechs })(TechSelectOptions)
