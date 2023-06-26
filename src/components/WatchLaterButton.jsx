import React from 'react'
import PropTypes from 'prop-types'

function WatchLaterButton ({ saved, onClick }) {
  return (
    <button
      className={`btn btn-light btn-watch-later${saved ? ' blue' : ''}`}
      data-testid={saved ? 'remove-watch-later' : 'watch-later'}
      onClick={onClick}
      type="button"
    >
      {saved
        ? (
          <i className="bi bi-check" />
        )
        : 'Watch Later' }
    </button>
  )
}

WatchLaterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  saved: PropTypes.bool
}

WatchLaterButton.defaultProps = {
  saved: false
}

export default WatchLaterButton
