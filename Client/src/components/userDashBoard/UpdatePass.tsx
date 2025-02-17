/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";
import { useUpdatePasswordMutation } from "@/Redux/Features/Auth/AuthApi";
import { motion } from "framer-motion"; // Import Framer Motion

// Improved schema with additional validation rules
const formSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

const UpdatePass = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });
  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading("Updating password...");
      const loginData = {
        oldPassword: values?.oldPassword,
        newPassword: values?.newPassword,
      };
      const res = await updatePassword(loginData);

      if (res?.error) {
        toast.error(
          (res?.error as any)?.error ||
            (res?.error as any)?.data?.message ||
            "Something went wrong.",
          { id: toastId }
        );
      } else {
        reset();
        toast.success("Password updated successfully!", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    }
  };

  return (
    <section className="py-14 bg-gradient-to-r from-gray-100 via-gray-200 to-blue-100 h-full">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <motion.div
            className="mx-auto max-w-sm w-full rounded-xl shadow-lg p-8 bg-gradient-to-r from-blue-400 to-blue-600 text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="mb-6 text-center">
              <p className="text-2xl font-semibold text-white">
                Update your password
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-4">
                  {/* Old Password Field */}
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="flex justify-between items-center">
                          <FormLabel
                            htmlFor="oldPassword"
                            className="text-white"
                          >
                            Current Password
                          </FormLabel>
                        </div>
                        <FormControl>
                          <PasswordInput
                            id="oldPassword"
                            placeholder="******"
                            autoComplete="oldPassword"
                            {...field}
                            className="input input-bordered input-sm w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* New Password Field */}
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="flex justify-between items-center">
                          <FormLabel
                            htmlFor="newPassword"
                            className="text-white"
                          >
                            New Password
                          </FormLabel>
                        </div>
                        <FormControl>
                          <PasswordInput
                            id="newPassword"
                            placeholder="******"
                            autoComplete="newPassword"
                            {...field}
                            className="input input-bordered input-sm w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      className="mt-4 w-full bg-blue-700 hover:bg-blue-800 rounded-lg text-white py-2 transition-all"
                    >
                      Update Password
                    </Button>
                  </motion.div>
                </div>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpdatePass;
