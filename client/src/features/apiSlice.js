// === src/features/apiSlice.js ===
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api",
    baseUrl: "https://ga-assignment-1.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data
      })
    }),
    getDeals: builder.query({
      query: () => "/deals"
    }),
    createDeal: builder.mutation({
      query: (data) => ({
        url: "/deals",
        method: "POST",
        body: data
      })
    }),
    getStats: builder.query({
      query: () => "/admin/stats"
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetDealsQuery,
  useCreateDealMutation,
  useGetStatsQuery
} = apiSlice;