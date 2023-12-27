import {createSlice} from "@reduxjs/toolkit"

export const sharePanelSlice = createSlice({
name:'sharePanel',
initialState: {
    sharePanelStatus: false
},
reducers: {
    sharePanelTrue: state => {
        state.sharePanelStatus = true
    },
    sharePanelFalse: state => {
        state.sharePanelStatus = false
    }
}
})

export const {sharePanelTrue, sharePanelFalse} = sharePanelSlice.actions

export default sharePanelSlice.reducer