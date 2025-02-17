/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  useProductDeleteMutation,
  useSingleProductQuery,
  useUpdateProductMutation,
} from "@/Redux/Features/Product/ProductApi";
import { toast } from "sonner";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const UpdateProduct = ({ id }: { id: string }) => {
  const [productDelete] = useProductDeleteMutation();
  const { data: singleProduct, isLoading } = useSingleProductQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    <div>
      <p>Loading... Please Wait</p>
    </div>;
  }

  const [updateProduct] = useUpdateProductMutation();
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: singleProduct?.data?.name,
      image: singleProduct?.data?.image,
      description: singleProduct?.data?.description,
      brand: singleProduct?.data?.brand,
      price: singleProduct?.data?.price,
      quantity: singleProduct?.data?.quantity,
      type: singleProduct?.data?.type,
      inStock: singleProduct?.data?.inStock,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (singleProduct?.data) {
      reset({
        name: singleProduct.data.name || "",
        image: singleProduct.data.image || "",
        description: singleProduct.data.description || "",
        brand: singleProduct.data.brand || "",
        price: singleProduct.data.price || 0,
        quantity: singleProduct.data.quantity || 0,
        type: singleProduct.data.type || "",
      });
    }
  }, [singleProduct, reset]);

  // image upload to coudinary start
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (file: File) => {
    setImage(file);
  };
  // image upload to coudinary  end

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      let imageUrl = singleProduct.data.image;
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "assignment-4"); // Replace with your Cloudinary preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/deqfsledi/image/upload", // Replace with your Cloudinary cloud name
          formData
        );
        // cloudirnay img url
        imageUrl = response.data.secure_url;
      }

      const updateData = {
        ...data,
        image: imageUrl,
      };

      const res = await updateProduct({
        id,
        data: updateData,
      });

      if (res?.error) {
        toast.error((res?.error as any)?.error || "Something went wrong", {
          id: toastId,
        });
      } else {
        toast.success("Product Updated Successfull...", { id: toastId });
        reset();
        setOpen(!open);
      }
    } catch (error) {
      toast.error("Failed to Add Product. Please try again.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await productDelete(id);
      if (res?.error) {
        toast.error("Something went wrong...", { id: toastId });
      } else {
        toast.success("Deleted Product...", { id: toastId });
      }
    } catch (error) {
      toast.error("Delete Failed...", { id: toastId });
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div onClick={() => setOpen(!open)}>
            <FaEdit className="text-blue-600 cursor-pointer  mx-auto" />
          </div>
        </DialogTrigger>
        <DialogContent
          aria-describedby={undefined}
          className="sm:max-w-[425px]"
        >
          <DialogTitle className="sr-only">Update Product</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 max-w-md mx-auto w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    {error && <p className="text-red-500">{error.message}</p>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        {/* Show Image Preview if Available */}
                        {field.value && typeof field.value === "string" && (
                          <img
                            src={field.value}
                            alt="Product"
                            className="w-32 h-32 object-cover rounded-lg border"
                          />
                        )}

                        {/* File Input for Image Upload */}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageChange(file); // Upload & update form state
                            }
                          }}
                        />
                      </div>
                    </FormControl>

                    {/* Error Message */}
                    {error && <p className="text-red-500">{error.message}</p>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description-dialog" // Set the ID to match `aria-describedby`
                        placeholder="Enter description"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    {error && <p className="text-red-500">{error.message}</p>}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        value={field.value || ""} // Use field.value for controlled behavior
                        onValueChange={field.onChange} // Update form state
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Mountain">Mountain</SelectItem>
                            <SelectItem value="Road">Road</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="BMX">BMX</SelectItem>
                            <SelectItem value="Electric">Electric</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {error && <p className="text-red-500">{error.message}</p>}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Product Brand</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product brand"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    {error && <p className="text-red-500">{error.message}</p>}
                  </FormItem>
                )}
              />
              <div className="flex gap-4 justify-between items-center">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>Product Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Product price"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      {error && <p className="text-red-500">{error.message}</p>}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>Product Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Product quantity"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      {error && <p className="text-red-500">{error.message}</p>}
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded">
                Add Product
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <FaTrash
        onClick={() => handleDeleteProduct(id)}
        className="text-red-600 cursor-pointer  mx-auto"
      />
    </div>
  );
};

export default UpdateProduct;
