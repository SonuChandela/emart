import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4545/api/' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: 'user/register',
                method: 'POST',
                body: userData,
            })
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation } = usersApi;
export default usersApi;