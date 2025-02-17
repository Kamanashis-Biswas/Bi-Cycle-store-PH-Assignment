/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdBicycle } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import loginImage from "@/assets/login/Login.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { PasswordInput } from "@/components/ui/password-input";
import { useLoginMutation } from "@/Redux/Features/Auth/AuthApi";
import { jwtDecode } from "jwt-decode";
import { setUser, useCurrentToken } from "@/Redux/Features/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const token = useAppSelector(useCurrentToken);

  const location = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading("Loading...");
      const loginData = {
        email: values?.email,
        password: values?.password,
      };

      const res = await login(loginData);

      if (res?.error) {
        toast.error(
          (res?.error as any)?.message ||
            (res?.error as any)?.data?.message ||
            "Something went wrong",
          { id: toastId }
        );
      } else {
        const user = await jwtDecode(res?.data?.data?.token);
        dispatch(setUser({ user, token: res?.data?.data?.token }));
        navigate(location.state || "/", { replace: true });
        toast.success(
          "Login Successful..., If you not update your profile please update now.",
          { id: toastId }
        );
      }
    } catch (error) {
      toast.error("Failed to login. Please try again.");
    }
  };

  if (token) {
    return (
      <div className="h-[60vh] grid place-items-center p-4">
        <div className="mt-5 mx-auto text-center">
          <h1>You are already logged in..</h1>
          <Link to={"/products"}>
            <Button variant={"outline"} className="mt-5 hover:text-blue-600">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-14 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* Left Section (Login Form) */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6 text-center">
            <Link
              to={"/"}
              className="text-2xl font-bold flex items-center gap-2 justify-center"
            >
              <IoMdBicycle className="text-3xl text-blue-600" />
              <h1>
                Bike<span className="text-blue-600">Nexus</span>
              </h1>
            </Link>
            <p className="text-muted-foreground mt-2">
              Please login to your account.
            </p>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
                <div className="mb-6 text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Login
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Please enter your credentials to login.
                  </p>
                </div>

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel
                        htmlFor="email"
                        className="text-sm text-gray-600"
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 my-6">
                      <FormLabel
                        htmlFor="password"
                        className="text-sm text-gray-600"
                      >
                        Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 mt-4 focus:ring-4 focus:ring-blue-300"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section (Image) */}
        {/* Right Section (Image) */}
        <div className="hidden lg:block w-1/2">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
