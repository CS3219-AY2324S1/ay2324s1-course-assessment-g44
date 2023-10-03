import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    userToken: null, // for storing the JWT
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: {},
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;