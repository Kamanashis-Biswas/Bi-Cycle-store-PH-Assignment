import { baseApi } from "@/Redux/Api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userAllOrders: builder.query({
            query: () => ({
                url: `/order/userAllOrders`,
                method: "GET",
            }),
            providesTags: ["order"]
        }),
        adminAllOrders: builder.query({
            query: () => ({
                url: `/order/adminAllOrders`,
                method: "GET",
            }),
            providesTags: ["order"]
        }),
        createOrder: builder.mutation({
            query: (data) => ({
                url: `/order/create-order`,
                method: "POST",
                body: data
            }),
        }),
        getOrder: builder.mutation({
            query: (id) => ({
                url: `/order/verify?order_id=${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["order"]
        }),
    })
})

export const {
    useCreateOrderMutation,
    useUserAllOrdersQuery,
    useAdminAllOrdersQuery,
    useGetOrderMutation
} = orderApi