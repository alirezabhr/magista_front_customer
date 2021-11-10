class Invoice {
    id: number
    status: number
    shop: number
    customer: number
    updatedAt: Date
    createdAt: Date

    constructor (id: number, status: number, shop: number, customer: number, updatedAt: Date, createdAt: Date) {
        this.id = id
        this.status = status
        this.shop = shop
        this.customer = customer
        this.updatedAt = updatedAt
        this.createdAt = createdAt
    }
}