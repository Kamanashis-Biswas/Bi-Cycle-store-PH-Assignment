import { Input } from "@/components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
import Cycle from "./Cycle";
import { useAllProductsQuery } from "@/Redux/Features/Product/ProductApi";
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export type Tproduct = {
    _id: string;
    image: string;
    name: string;
    brand: string;
    price: number;
    type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
    model: string;
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    totalQuantity?: number
}

const RightSide = () => {
    // Filter State
    const [filters, setFilters] = useState({
        searchTerm: "",
        type: "",
        inStock: "",
        minPrice: "",
        maxPrice: "",
    });




    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8; // Items per page

    // Handle filter changes
    const handleFilterChange = (e: FieldValues) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset to first page on filter change
    };

    // Construct API Query Object
    const query = useMemo(() => {
        const params: Record<string, string> = { page: currentPage.toString(), limit: limit.toString() };
        if (filters.searchTerm) params.searchTerm = filters.searchTerm;
        if (filters.type) params.type = filters.type;
        if (filters.inStock) params.inStock = filters.inStock === "In Stock" ? "true" : "false";
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        return params;
    }, [filters, currentPage]);

    const { data: allProducts, isLoading, isError } = useAllProductsQuery(query)

    const totalPages = allProducts?.meta?.totalPage || 1;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    let content;
    if (isLoading && !isError) {
        content = <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    }
    if (!isLoading && isError) {
        content = <div>
            <h1 className="text-red-600 font-semibold">Something went wrong...</h1>
        </div>
    }
    if (!isLoading && !isError && allProducts?.data?.length === 0) {
        content = <div>
            <h1 className="text-red-600 font-semibold">No product found...</h1>
        </div>
    }
    if (!isLoading && !isError && allProducts?.data) {
        content = allProducts?.data
            ?.map((item: Tproduct, index: number) => <Cycle key={index} item={item} />)
    }

    return (
        <div>
            {/* Header Section */}
            <div className="flex md:flex-row flex-col md:gap-5 gap-3 items-center">
                {/* Search Bar (50% Width) */}
                <div className="md:w-1/2 w-full">
                    <Input
                        type="text"
                        name="searchTerm"
                        placeholder="Search by brand, name, or category"
                        className="w-full"
                        value={filters.searchTerm}
                        onChange={handleFilterChange}
                    />
                </div>

                {/* Filters (Dropdowns & Price Inputs in 50%) */}
                <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-3 justify-end">
                    {/* Type Filter */}
                    <Select onValueChange={(value) => handleFilterChange({ target: { name: "type", value: value === "all" ? "" : value } })}>
                        <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="Mountain">Mountain</SelectItem>
                                <SelectItem value="Road">Road</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                <SelectItem value="BMX">BMX</SelectItem>
                                <SelectItem value="Electric">Electric</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Stock Availability Filter */}
                    <Select onValueChange={(value) => handleFilterChange({ target: { name: "inStock", value: value === "all" ? "" : value } })}>
                        <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                            <SelectValue placeholder="All Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Availability</SelectItem>
                                <SelectItem value="In Stock">In Stock</SelectItem>
                                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Price Range Filter */}
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            name="minPrice"
                            placeholder="Min"
                            className="md:w-20 w-full"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                        />
                        <span>-</span>
                        <Input
                            type="number"
                            name="maxPrice"
                            placeholder="Max"
                            className="md:w-20 w-full"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 py-5">
                {content}
            </div>

            {/* No Products Found */}
            {allProducts?.data?.length === 0 && (
                <div className="text-center mt-8 text-gray-500">No products match.</div>
            )}

            {/* Pagination */}
            <div className="flex justify-center my-8 gap-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 transition-all duration-300"
                >
                    Prev
                </button>
                <span className="px-4 py-2 text-black">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 transition-all duration-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RightSide;