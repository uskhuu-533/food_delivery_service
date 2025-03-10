'use client'

import OrderItem from "./Order-Item"

type Props = {
    order :order
}
type order ={
    foodOrderItems : string[]
    status : string
    createdAt : Date,
    user : string,
    totalPrice : number
}

const OrderList = ({order}:Props) => {
    console.log(order);
    
    return(
        <div className="w-full h-fit flex flex-col p-3 gap-3 border-b border-dashed">
            <div className="w-full flex justify-between">
                <p>${order.totalPrice}</p>
                <div>{order.status}</div>
                <div className="flex flex-col ">
                    {order.foodOrderItems.map((orderItem:string, index)=>(<OrderItem key={index} itemId={orderItem}/>))}
                </div>
            </div>
        </div>
    )
}
export default OrderList