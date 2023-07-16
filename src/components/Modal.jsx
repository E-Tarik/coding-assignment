import '../styles/modal.scss'

import React from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'

import modalSlice from '../data/modalSlice'

export const Modal = () => {
  const dispatch = useDispatch()
  const {
    modal: { videoKey, isModalVisible },
  } = useSelector((state) => state)
  const { setVideoKey, hideModal } = modalSlice.actions
  const handleClick = (e) => {
    e.stopPropagation()
    dispatch(setVideoKey(''))
    dispatch(hideModal())
  }

  return isModalVisible ? (
    <div className="modal">
      <div className="wrapper" onClick={handleClick}>
        {videoKey ? (
          <ReactPlayer
            className="video-player"
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            controls={true}
            playing={true}
            data-testid="youtube-player"
          />
        ) : (
          <div className="no-trailer-wrapper">
            <h6>no trailer available. Try another movie</h6>
          </div>
        )}
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={handleClick}
        >
          &times;
        </button>
      </div>
    </div>
  ) : null
}
