import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    accessToken: "",
    refreshToken: "",
    user: {
        userId: 0,
        firstName: "",
        lastName: "",
        username: "",
        profileUrl: ""
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuth = true
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer;