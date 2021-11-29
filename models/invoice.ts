import Order from "./order"

class Invoice {
    id: number
    orders: Order[]
    totalAmount: number
    isPaid: boolean
    createdAt: Date

    constructor (id: number,  orders: Order[], totalAmount: number, isPaid: boolean, createdAt: Date) {
        this.id = id
        this.orders = orders
        this.totalAmount = totalAmount
        this.isPaid = isPaid
        this.createdAt = createdAt
    }
}

export default Invoice
