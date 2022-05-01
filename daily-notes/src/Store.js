import { createSlice, configureStore } from '@reduxjs/toolkit';


const loginSlice = createSlice({

    name: 'loginInfo',
    initialState: {
        username: "",
        password: "",
      tasksState: []
       
    },
    reducers: {

        setLoginData(state, action) {

            state.username = action.payload.username;
            state.password = action.payload.password;

        },

       

        updateTasks(state, action) {

            state.tasksState = [ ...action.payload.data]

        }


    }



});





export const loginData = loginSlice.actions;


const store = configureStore({ reducer: loginSlice.reducer });


export default store;