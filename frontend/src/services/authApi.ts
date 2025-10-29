import {baseApi} from './api';
import type {
  AuthRequest,
  AuthResponse, UserStats,
} from '@/types/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<AuthResponse, AuthRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    checkAuth: builder.query<AuthResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      providesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    stats: builder.query<UserStats, number>({
      query: (userId) => ({
        url: `/stats/${userId}`,
        method: 'GET',
      }),
    })
  }),
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useCheckAuthQuery, useStatsQuery} = authApi;