import {ShoppingCart, User } from "lucide-react"
import SelectLocation from "./Select-Location"
import OrderDetail from "../features/Order-Details"
import UserDetail from "./User"

const CartUser = () => {
    return(
        <div className="w-fit h-full rounded-full dark:text-white flex gap-3">
            <SelectLocation />
            <OrderDetail />
            <UserDetail />
        </div>
    )
}
export default CartUser