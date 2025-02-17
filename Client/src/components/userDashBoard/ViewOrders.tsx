/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserAllOrdersQuery } from "@/Redux/Features/Order/OrderApi";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

const ViewOrders = () => {
    const { data: allOrders, isLoading, isError } = useUserAllOrdersQuery(undefined)
    const orders = allOrders?.data

    let content;

    if (isLoading && !isError) {
        content = <div className="flex items-center space-x-4 p-5">
            <Skeleton className="h-12 w-12 rounded-full" />
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
    if (!isLoading && !isError && orders?.length === 0) {
        content = <div>
            <h1 className="text-red-600 font-semibold">No product found...</h1>
        </div>
    }
    if (!isLoading && !isError && orders?.length > 0) {
        content = orders?.map((item: any, index: number) => <tr key={index} className="border-t hover:bg-gray-100">
            <td className="p-3 first-line:gap-2">
                {item?.transaction?.id}
            </td>
            <td className="p-3  gap-2">
                {item?.user?.name}
            </td>
            <td className="p-3  gap-2">
                {item?.user?.email}
            </td>
            <td className="p-3  gap-2">
                {new Date(item?.createdAt).toLocaleDateString()}
            </td>
            <td className="p-3  gap-2">
                {item?.totalPrice}
            </td>
            <td className="p-3  gap-2">
                <Button variant={"outline"} className={`${item?.status === "Pending" && "text-gray-600 "} ${item?.status === "Paid" && "text-blue-600 "} ${item?.status === "Cancelled" && "text-red-600 "} pointer-events-none w-full`}>{item?.status}</Button>
            </td>
        </tr>)
    }
    return (
        <div className="space-y-5 container mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">My Orders</h1>
            </div>
            <div className=" bg-gray-100">

                <div className="bg-white rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3">Transaction Id</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewOrders;