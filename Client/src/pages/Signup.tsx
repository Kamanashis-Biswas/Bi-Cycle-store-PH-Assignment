/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdBicycle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { PasswordInput } from "@/components/ui/password-input";
import { useRegistrationMutation } from "@/Redux/Features/Auth/AuthApi";
import { useAppSelector } from "@/Redux/hooks";
import { useCurrentToken } from "@/Redux/Features/Auth/AuthSlice";
import signupImage from "@/assets/signup/signup.png";

// Improved schema with additional validation rules
const formSchema = z.object({
  name: z.string().min(1, { message: "Invalid name address" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

const Signup = () => {
  const [signUp] = useRegistrationMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const token = useAppSelector(useCurrentToken);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const toastId = toast.loading("Loading...");
      const signUpData = {
        name: values?.name,
        email: values?.email,
        password: values?.password,
      };

      const res = await signUp(signUpData);
      if (res?.error) {
        toast.error(
          (res?.error as any)?.message ||
            (res?.error as any)?.data?.message ||
            "Something went wrong",
          { id: toastId }
        );
      } else {
        navigate("/login");
        toast.success("Registration Successful..., Please login now", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    }
  }

  if (token) {
    return (
      <div className="h-[60vh] grid place-items-center">
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
        {/* Left Section (Signup Form) */}
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
              Please enter your details.
            </p>
          </div>

          {/* Signup Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
                <div className="mb-6 text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Sign Up
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Please enter your credentials to sign up.
                  </p>
                </div>

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel
                        htmlFor="name"
                        className="text-sm text-gray-600"
                      >
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          type="text"
                          className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel
                        htmlFor="email"
                        className="text-sm text-gray-600 mt-6"
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

                {/* Signup Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 mt-4 focus:ring-4 focus:ring-blue-300"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="hidden lg:block w-1/2">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;
