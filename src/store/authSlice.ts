import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  id: number | null;
  username: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  id: null,
  username: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; id: number; username: string; }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.id = null;
      state.username = null;
    }
  }
})

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuth = (state: RootState) => state.auth.isAuthenticated;
export const selectUsername = (state: RootState) => state.auth.username;