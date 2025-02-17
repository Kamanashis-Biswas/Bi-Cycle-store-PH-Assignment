import { baseApi } from "@/Redux/Api/baseApi";
import { IProductResponse, TResponseRedux } from "@/types/types";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allProducts: builder.query({
            query: (params: {
                searchTerm?: string;
                type?: string;
                inStock?: string;
                minPrice?: number;
                maxPrice?: number;
                limit?: number;
                page?: number
            } = {}) => {
                const queryParams = new URLSearchParams();

                if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
                if (params.type) queryParams.append("type", params.type);
                if (params.inStock) queryParams.append("inStock", params.inStock);
                if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString());
                if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());
                if (params.limit) queryParams.append("limit", params.limit.toString());
                if (params.page) queryParams.append("page", params.page.toString());

                return {
                    url: `/product?${queryParams.toString()}`,
                    method: "GET",
                }
            },
            transformResponse: (response: TResponseRedux<IProductResponse[]>) => ({
                data: response?.data?.result,
                meta: response?.data?.meta
              }),

            providesTags: ["product"]
        }),
        singleProduct: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: "GET",
            }),
            providesTags: ["product"]
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: `/product/create`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["product"]
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => (
                console.log(id, data, "redux"),

                {
                    url: `/product/${id}`,
                    method: "PATCH",
                    body: data
                }),
            invalidatesTags: ["product"]
        }),
        productDelete: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["product"]
        }),
    })
})

export const {
    useAllProductsQuery,
    useSingleProductQuery,
    useProductDeleteMutation,
    useUpdateProductMutation,
    useAddProductMutation
} = productApi