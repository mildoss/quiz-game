import {baseApi} from "@/services/api";
import {StatsResponse} from "@/types/user";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, number>({
      query: (userId) => ({
        url: `/stats/${userId}`,
        method: 'GET',
      }),
    }),
  })
})

export const {useGetStatsQuery} = statsApi;

