import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'

function YoutubePlayer ({ videoKey }) {
  return (
    <ReactPlayer
      className="video-player"
      controls
      data-testid="youtube-player"
      height="100%"
      playing
      url={`https://www.youtube.com/watch?v=${videoKey}`}
      width="100%"
    />
  )
}

YoutubePlayer.propTypes = {
  videoKey: PropTypes.string.isRequired
}

export default YoutubePlayer
