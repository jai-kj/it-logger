import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { searchLogs, clearSearch } from '../../actions/logActions'

const SearchBar = ({ searchLogs, clearSearch, filtered }) => {

  useEffect(() => {
    if(filtered === null) {
      search.current.value = ''
    }
    //eslint-disable-next-line
  }, [])

  const eraseSearch = () => {
    search.current.value = ''
    clearSearch()
  }
  const search = useRef('')
  const onChange = e => {
    if(search.current.value !== ''){
      searchLogs(e.target.value)
    } else {
      eraseSearch()
    }
  }

  return (
    <nav style={{ marginBottom: '30px' }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input id="search" type="search" placeholder="Search Logs" ref={search} onChange={onChange} />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons" onClick={eraseSearch}>close</i>
          </div>
        </form>
      </div>
    </nav>
  )
}

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  filtered: PropTypes.array
}

const mapStateToProps = state => ({
  filtered: state.log.filtered
})

export default connect( mapStateToProps, { searchLogs, clearSearch })(SearchBar)
