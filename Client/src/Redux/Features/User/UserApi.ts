import { baseApi } from "@/Redux/Api/baseApi"

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allUsers: builder.query({
            query: () => ({
                url: `/admin/users`,
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: ({id, booleans}) => ({
                url: `/admin/users/${id}/block`,
                method: "PATCH",
                body: {isBlocked: booleans}
            }),
            invalidatesTags: ["user", "authme"]
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `/auth/update-profile`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["user", "authme"]
        })
    })
})

export const {
    useAllUsersQuery,
    useUpdateUserMutation,
    useUpdateUserProfileMutation
} = userApi