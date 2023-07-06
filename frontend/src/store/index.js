import { configureStore, createSlice } from '@reduxjs/toolkit'; // toolkit will allow us to create a slices of the redux states;

const authSlice = createSlice({
    name:"auth",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer,
})