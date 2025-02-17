import emptyCart from '@/assets/icons/emptycart.png'
import CartItem from '@/components/Cart/CartItem';
import { Tproduct } from '@/components/Shop/RightSide';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/Redux/hooks';
import { Link } from 'react-router-dom';
const Cart = () => {

    const { carts, selectedItems, totalPrice } = useAppSelector(state => state.product)


    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-semibold'>My Cart</h1>
            {
                carts?.length > 0 ? <div className=" grid lg:grid-cols-12 gap-10 py-5">
                    <div className="lg:col-span-8 flex flex-col gap-5">
                        {
                            carts?.map((cart: Tproduct, index: number) => <CartItem key={index} cart={cart} />)
                        }
                    </div>
                    <div className="lg:col-span-4">
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

                            <Link to={'/checkOut'}>
                                <Button
                                    className="w-full mt-4 p-2 rounded bg-blue-600 hover:bg-blue-700 text-white duration-200"
                                >
                                    ChecOut Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div> :
                    <div className='grid place-items-center min-h-[60vh]'>
                        <div className='space-y-5 flex items-center flex-col'>
                            <img src={emptyCart} width={150} alt="empty" />
                            <h1 className='text-2xl font-semibold'>There is no item in your cart!</h1>
                            <div className="mt-5 mx-auto text-center">
                                <Link to={'/products'}>
                                    <Button variant={"outline"}>View All</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Cart;