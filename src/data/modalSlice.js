import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalVisible: false,
    videoKey: null,
  },
  reducers: {
    showModal: (state) => {
      state.isModalVisible = true
    },
    hideModal: (state) => {
      state.isModalVisible = false
    },
    setVideoKey: (state, action) => {
      state.videoKey = action.payload
    },
  },
})

export default modalSlice
