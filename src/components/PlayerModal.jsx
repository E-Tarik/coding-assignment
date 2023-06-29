import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ENDPOINT, API_KEY } from '../constants'
import YouTubePlayer from './YoutubePlayer'
import playerSlice from '../data/playerSlice'
import '../styles/player.scss'

export const getMovie = async (id) => {
  const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

  const videoData = await fetch(URL)
    .then((response) => response.json())

  if (videoData.videos && videoData.videos.results.length) {
    const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')

    return trailer ? trailer.key : videoData.videos.results[0].key
  }

  return null
}

const { setCurrentMovieId } = playerSlice.actions

function PlayerModal () {
  const currentMovieId = useSelector((state) => state.player.currentMovieId)

  const [isLoading, setIsLoading] = useState(true)
  const [videoKey, setVideoKey] = useState(null)

  const dispatch = useDispatch()

  const onClose = useCallback(() => {
    dispatch(setCurrentMovieId(null))
  }, [dispatch])

  useEffect(() => {
    if (!currentMovieId) return

    document.body.classList.add('remove-scrolling')

    getMovie(currentMovieId)
      .then(key => {
        setIsLoading(false)
        setVideoKey(key)
      })
      .catch(console.error)

    return () => {
      document.body.classList.remove('remove-scrolling')
    }
  }, [currentMovieId])

  if (!currentMovieId) return null

  return (
    <div className="player-modal">
      <div
        className="player-modal__backdrop"
        onClick={onClose}
      />

      <div className="player-modal__container">
        {isLoading
          ? 'Loading...'
          : (
            <div className="player-modal__player">
              <YouTubePlayer
                videoKey={videoKey}
              />
            </div>
          )}
      </div>

      <button
        className="player-modal__close"
        onClick={onClose}
        title="Close"
        type="button"
      >
        &times;
      </button>
    </div>
  )
}

export default PlayerModal
