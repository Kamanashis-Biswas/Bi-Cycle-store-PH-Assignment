import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";

const OrderResponse = () => {
    const [searchParams] = useSearchParams()
    const invoice = searchParams.get('order_id')

    return (
        <div className="grid place-items-center h-[75vh]">
            <div className="text-center rounded shadow md:p-10 p-4">
                <h1 className="text-3xl font-bold mb-4">🎉 Your transaction ID is</h1>
                <div>
                    <Button variant={"outline"} className="text-blue-700 py-3 px-5 rounded-lg font-mono text-sm shadow-inner mb-8">
                        {invoice
                            || "N/A"}
                    </Button>
                </div>
                <Link
                    to="/userDashboard/viewOrders"

                >
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300">My Orders</Button>
                </Link>

                <p className=" text-sm py-5">Our representative will contact you soon. <br /> Until then, stay healthy and well. Thank you.</p>
            </div>
        </div>
    );
};

export default OrderResponse;