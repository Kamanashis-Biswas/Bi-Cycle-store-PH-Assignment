import { baseApi } from "@/Redux/Api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        user: builder.query({
            query: (id) => ({
                url: `/auth/user/${id}`,
                method: "GET",
            }),
            providesTags: ["authme"]
        }),
        registration: builder.mutation({
            query: (info) => ({
                url: '/auth/register',
                method: "POST",
                body: info
            })
        }),
        login: builder.mutation({
            query: (info) => ({
                url: '/auth/login',
                method: "POST",
                body: info
            }),
        }),
        updatePassword: builder.mutation({
            query: (info) => ({
                url: '/auth/update-password',
                method: "POST",
                body: info
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: "POST",
            }),
            invalidatesTags: ['task']
        })
    })
})

export const { 
    useRegistrationMutation,
    useLoginMutation, 
    useLogoutMutation, 
    useUpdatePasswordMutation,
    useUserQuery } = authApi