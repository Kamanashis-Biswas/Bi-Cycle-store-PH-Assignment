/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { useUpdateUserProfileMutation } from "@/Redux/Features/User/UserApi";
import { useCurrentToken } from "@/Redux/Features/Auth/AuthSlice";
import { jwtDecode } from "jwt-decode";
import { Tuser } from "@/components/userDashBoard/ProfileSetting";
import { useUserQuery } from "@/Redux/Features/Auth/AuthApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useCreateOrderMutation } from "@/Redux/Features/Order/OrderApi";
import { afterOrder } from "@/Redux/Features/Product/ProductSlice";


const formSchema = z.object({
    name: z.string().min(1, { message: "name is required" }),
    email: z.string({ required_error: "email is required" }).min(1, { message: "email is required" }),
    address: z.string({ required_error: "address is required" }).min(1, { message: "address is required" }),
    city: z.string({ required_error: "city is required" }).min(1, { message: "city is required" }),
    phone: z.string({ required_error: "phone is required" }).min(1, { message: "phone is required" })
})


const CheckOut = () => {
    const dispatch = useAppDispatch()
    const [updateProfile] = useUpdateUserProfileMutation()
    const token = useAppSelector(useCurrentToken)
    let user;
    if (token) {
        user = jwtDecode(token) as Tuser
    }
    const { data: userData } = useUserQuery(user?.id)
    const profile = userData?.data
    const navigate = useNavigate()
    const { selectedItems, totalPrice } = useAppSelector(state => state.product)
    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
        }
    )


    const { reset } = form

    useEffect(() => {
        if (profile) {
            reset({
                name: profile?.name || "",
                email: profile?.email || "",
                address: profile?.address || "",
                city: profile?.city || "",
                phone: profile?.phone || "",
            });
        }
    }, [profile, reset]);

    const { carts } = useAppSelector(state => state.product)

    const [createOrder, { isLoading, isSuccess, data, isError, error }] =
        useCreateOrderMutation();



    const handlePlaceOrder = async () => {
        await createOrder({ products: carts });

    };

    // const navigate = useNavigate();

    // const handleLoginRedirect = () => {
    //     navigate('/login', { state: '/cart', replace: true });
    // };

    const toastId = "cart";
    useEffect(() => {
        if (isLoading) toast.loading("Processing ...", { id: toastId });

        if (isSuccess) {
            toast.success(data?.message, { id: toastId });
            if (data?.data) {
                dispatch(afterOrder())
                setTimeout(() => {
                    window.location.href = data.data;
                }, 1000);
            }
        }

        if (isError) toast.error(JSON.stringify(error), { id: toastId });


    }, [data?.data, data?.message, error, isError, isLoading, isSuccess, dispatch]);


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const toastId = toast.loading("Loading...")

        try {
            const res = await updateProfile({ ...values })
            if (res?.error) {
                toast.error((res?.error as any)?.error || (res?.error as any)?.data?.message, { id: toastId })
            } else {
                toast.success("Profile updated Successfull...", { id: toastId })
                setTimeout(() => {
                    handlePlaceOrder()
                }, 1000);
            }

        } catch (error) {
            toast.error('Failed to Update profile. Please try again.')
        }
    }
    useEffect(() => {
        if (selectedItems === 0) {
            navigate('/')
        }
    }, [navigate, selectedItems])
    return (
        <div className="container mx-auto py-5 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 flex flex-col gap-5 rounded border p-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-md mx-auto w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} value={field.value || ''} />
                                    </FormControl>
                                    {
                                        error && <p className="text-red-500">{error.message}</p>
                                    }
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input readOnly placeholder="email" {...field} value={field.value || ''} />
                                    </FormControl>
                                    {
                                        error && <p className="text-red-500">{error.message}</p>
                                    }
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Paddress" {...field} value={field.value || ''} />
                                    </FormControl>
                                    {
                                        error && <p className="text-red-500">{error.message}</p>
                                    }
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4 justify-between items-center">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="city" {...field} value={field.value || ''} />
                                        </FormControl>
                                        {
                                            error && <p className="text-red-500">{error.message}</p>
                                        }
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="phone" {...field} value={field.value || ''} />
                                        </FormControl>
                                        {
                                            error && <p className="text-red-500">{error.message}</p>
                                        }
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded">Save address and order</Button>

                        <div className="flex items-center justify-end">
                            <p>Want to update profile? <span> </span>
                                <Link className="text-blue-600 underline" to={'/userDashboard/profileSetting'}>
                                    Profile
                                </Link>
                            </p>
                        </div>
                    </form>
                </Form>

            </div>
            <div className="lg:col-span-5">
                <div className="border bg-white p-4 rounded sticky top-24">
                    <h2 className="text-lg font-semibold text-center">Order Summary</h2>
                    <div className="flex justify-between mt-1">
                        <span>Total Item</span>
                        <span>{selectedItems}</span>
                    </div>

                    <div className="flex justify-between mt-2">
                        <span>Subtotal</span>
                        <span>Price: ${totalPrice}</span>
                    </div>
                    <div className='border my-3'>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>Price: ${totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;