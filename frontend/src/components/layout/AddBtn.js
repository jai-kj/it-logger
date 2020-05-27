import React from 'react'

const AddBtn = () => {
  return (
    <div className="fixed-action-btn">
      <button className="btn-floating btn-large blue darken-2">
        <i className="large material-icons">add</i>
      </button>
      <ul>
        <li>
          <a href="#about-app-modal" className="btn-floating grey modal-trigger">
            <i className="material-icons">help</i>
          </a>
        </li>
        <li>
          <a href="#tech-list-modal" className="btn-floating green modal-trigger">
            <i className="material-icons">person</i>
          </a>
        </li>
        <li>
          <a href="#add-tech-modal" className="btn-floating red modal-trigger">
            <i className="material-icons">person_add</i>
          </a>
        </li>
        <li>
          <a href="#add-log-modal" className="btn-floating black modal-trigger">
            <i className="material-icons">add_comment</i>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default AddBtn
