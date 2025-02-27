'use client'

type Props = {
    order :order
}
type order ={
    foodOrderItems : Item[]
    status : string
    createdAt : Date,
    user : string
}
type Item ={
    food : string
}
const OrderList = ({order}:Props) => {
    
    return(
        <div></div>
    )
}
export default OrderList