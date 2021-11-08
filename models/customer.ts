class Customer {
    user: number
    name: string
    province: string
    city: string
    address: string

    constructor(userId: number, name: string, province: string, city: string, address: string) {
        this.user = userId
        this.name = name
        this.province = province
        this.city = city
        this.address = address
    }
}