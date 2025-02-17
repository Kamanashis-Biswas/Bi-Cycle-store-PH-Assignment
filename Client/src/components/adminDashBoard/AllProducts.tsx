import AddProduct from "./AddProduct";
import { useAllProductsQuery } from "@/Redux/Features/Product/ProductApi";
import { Skeleton } from "../ui/skeleton";
import { Tproduct } from "../Shop/RightSide";
import UpdateProduct from "./UpdateProduct";
import { IoClose } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";

const AllProducts = () => {
  const {
    data: allProducts,
    isLoading,
    isError,
  } = useAllProductsQuery(undefined);
  let content;

  if (isLoading && !isError) {
    content = (
      <tr>
        <td colSpan={7} className="p-5">
          <div className="flex items-center justify-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </td>
      </tr>
    );
  }

  if (!isLoading && isError) {
    content = (
      <tr>
        <td colSpan={7} className="p-5 text-center text-red-600 font-semibold">
          Something went wrong...
        </td>
      </tr>
    );
  }

  if (!isLoading && !isError && allProducts?.data?.length === 0) {
    content = (
      <tr>
        <td colSpan={7} className="p-5 text-center text-red-600 font-semibold">
          No products found...
        </td>
      </tr>
    );
  }

  if (!isLoading && !isError && allProducts?.data) {
    content = allProducts?.data?.map((item: Tproduct, index: number) => (
      <tr
        key={index}
        className="border-t hover:bg-gray-50 transition-colors duration-200"
      >
        <td className="p-3 flex items-center gap-3">
          <img
            src={item?.image}
            alt={item.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {item.name}
        </td>
        <td className="p-3">{item.brand}</td>
        <td className="p-3 font-semibold">${item.price.toFixed(2)}</td>
        <td className="p-3">{item.type}</td>
        <td className="p-3">{item.quantity}</td>
        <td className="p-3 flex items-center justify-center">
          {item?.quantity !== 0 ? (
            <AiOutlineCheck className="text-green-500" />
          ) : (
            <IoClose className="text-red-500" />
          )}
        </td>
        <td className="p-3 text-xl">
          <UpdateProduct id={item?._id} />
        </td>
      </tr>
    ));
  }

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <AddProduct />
      </div>

      <div className="w-full min-h-screen bg-white shadow-md rounded-lg">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm font-semibold text-gray-600 bg-gray-100 border-b">
                <th className="p-4 text-left">Product Name</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">In Stock</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
