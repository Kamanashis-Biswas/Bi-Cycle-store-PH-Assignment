/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAllUsersQuery, useUpdateUserMutation } from "@/Redux/Features/User/UserApi";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner";

export type Tuser = {
    _id: string
    name: string,
    email: string,
    image?: string,
    role: "customer" | "admin",
    isBlocked: boolean
}
const AllUsers = () => {
    const { data: allUsers, isLoading, isError } = useAllUsersQuery(undefined)
    const [deactiveUser] = useUpdateUserMutation()

    const handleDeactive = async (id: string, booleans: boolean) => {
        const toastId = toast.loading("Loading...")
        try {
            const res = await deactiveUser({ id, booleans })
            console.log(res);

            if (res?.error) {
                toast.error((res?.error as any)?.message || (res?.error as any)?.data?.message || "Something went wrong", { id: toastId })
            } else {
                toast.success("User deactivated by Admin...", { id: toastId })
            }
        } catch (error) {
            toast.error("Failed to deactive this user...", { id: toastId })
        }
    }

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
    if (!isLoading && !isError && allUsers?.data?.length === 0) {
        content = <div>
            <h1 className="text-red-600 font-semibold">No product found...</h1>
        </div>
    }
    if (!isLoading && !isError && allUsers?.data?.length > 0) {
        content = allUsers?.data?.map((user: Tuser, index: number) => (
            <tr key={index} className="border-t hover:bg-gray-100">
                <td className="p-3 flex items-center gap-2">
                    <img src={user?.image} alt={user?.name} className="w-8 h-8 rounded-full" />
                    {user?.name}
                </td>
                <td className="p-3">{user?.email}</td>
                <td className="p-3 font-bold">{user?.role}</td>
                <td className="p-3">
                    {
                        user?.isBlocked ? <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={() => handleDeactive(user?._id, false)} variant="destructive" className="w-full">Deactive</Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Click to active this user</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                            :
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button onClick={() => handleDeactive(user?._id, true)} variant="outline" className="w-full">Active</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Click to deactive this user</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                    }
                </td>
            </tr>
        ))
    }



    return (
        <div className="space-y-5 w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">All Customers</h1>
            </div>
            <div className=" bg-gray-100 min-h-screen w-full">

                <div className="bg-white rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
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

export default AllUsers;