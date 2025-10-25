import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {RootState} from "@/store/store";
import {logout, setCredentials} from "@/store/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set("ngrok-skip-browser-warning", 'true');
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !(args as FetchArgs).url?.includes('/auth/refresh')) {
    const refreshResult = await baseQuery(
      {url: '/auth/refresh', method: 'POST'},
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { token, id, username } = refreshResult.data as { token: string, id: number, username: string; };
      api.dispatch(setCredentials({ token, id, username }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Quiz', 'User'],
  endpoints: () => ({}),
});