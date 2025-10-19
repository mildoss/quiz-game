import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "@/store/store";

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BACKEND_URL || 'https://cff726843b1d.ngrok-free.app',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        headers.set("ngrok-skip-browser-warning", 'true');
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Quiz', 'User'],
  endpoints: () => ({}),
});