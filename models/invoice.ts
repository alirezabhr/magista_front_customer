import Order from "./order"

class Invoice {
    id: number
    orders: Order[]
    totalAmount: number
    createdAt: Date

    constructor (id: number,  orders: Order[], totalAmount: number, createdAt: Date) {
        this.id = id
        this.orders = orders
        this.totalAmount = totalAmount
        this.createdAt = createdAt
    }
}

export default Invoice
