import {createSlice} from "@reduxjs/toolkit"

export const bigPlayerSlice = createSlice({
name:'bigPlayer',
initialState: {
    bigPlayerStatus: false
},
reducers: {
    bigPlayerTrue: state => {
        state.bigPlayerStatus = true
    },
    bigPlayerFalse: state => {
        state.bigPlayerStatus = false
    }
}
})

export const {bigPlayerTrue, bigPlayerFalse} = bigPlayerSlice.actions

export default bigPlayerSlice.reducer