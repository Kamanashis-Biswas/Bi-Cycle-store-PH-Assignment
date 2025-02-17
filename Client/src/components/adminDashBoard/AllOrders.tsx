/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAdminAllOrdersQuery, useGetOrderMutation } from "@/Redux/Features/Order/OrderApi";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { toast } from "sonner";

const AllOrders = () => {
    const [paymentCheck] = useGetOrderMutation()
    const { data: allOrders, isLoading, isError } = useAdminAllOrdersQuery(undefined)
    const orders = allOrders?.data?.allOrders

    let content;

    const handlePaymentCheck = async (id: string) => {
        const toastId = toast.loading("Loading...")

        try {
            const res = await paymentCheck(id);
            if (res?.error) {
                toast.error((res?.error as any)?.message || (res?.error as any)?.data?.message || 'something went wrong...', { id: toastId })
            } else {
                toast.success(res?.data?.data?.message || "Verify Success", { id: toastId })
            }
        } catch (error) {
            toast.error("Faild to verify, Please try again.", { id: toastId })
        }
    }

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
                <Button
                    variant={"outline"}
                    className={`w-full 
    ${item?.status === "Pending" && "text-gray-600"} 
    ${item?.status === "Paid" && "text-blue-600"} 
    ${item?.status === "Cancelled" && "text-red-600"} pointer-events-none`
                    }>
                    {item?.status}
                </Button>
            </td>
            <td className="p-3  gap-2">
                {
                    item?.status === "Paid" ? <Button disabled={item?.status === "Paid"} className="bg-blue-400 text-white w-full" variant={"outline"}>Success</Button>
                        :
                        <Button className="w-full" onClick={() => handlePaymentCheck(item?.transaction?.id)} variant={"outline"}>Check</Button>
                }

            </td>
        </tr>)
    }
    return (
        <div className="space-y-5 container mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">All Customers</h1>
            </div>
            <div className=" bg-gray-100 min-h-screen">

                <div className="bg-white rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3">Transaction Id</th>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
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

export default AllOrders;