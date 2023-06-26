import React from 'react'
import PropTypes from 'prop-types'

function Star ({ starred, onClick }) {
  return (
    <span
      className="btn-star"
      data-testid={starred ? 'unstar-link' : 'starred-link'}
      onClick={onClick}
    >
      <i
        className={`bi bi-star${starred ? '-fill' : ''}`}
        data-testid={starred ? 'star-fill' : undefined}
      />
    </span>
  )
}

Star.propTypes = {
  onClick: PropTypes.func.isRequired,
  starred: PropTypes.bool
}

Star.defaultProps = {
  starred: false
}

export default Star
