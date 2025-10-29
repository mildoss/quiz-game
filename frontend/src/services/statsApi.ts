import {baseApi} from "@/services/api";
import {UserStats} from "@/types/user";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<UserStats, number>({
      query: (userId) => ({
        url: `/stats/${userId}`,
        method: 'GET',
      }),
    })
  })
})

export const {useGetStatsQuery} = statsApi;

