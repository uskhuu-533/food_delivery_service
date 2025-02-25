import {ShoppingCart, User } from "lucide-react"
import SelectLocation from "./Select-Location"
import OrderDetail from "./Order-Details"

const CartUser = () => {
    return(
        <div className="w-fit h-full rounded-full dark:text-white flex gap-3">
            <SelectLocation />
            <OrderDetail />
            <div className="rounded-full flex items-center w-11 justify-center bg-[#EF4444]">
                <User size={16} stroke="#FFFFFF"/>
            </div>
        </div>
    )
}
export default CartUser