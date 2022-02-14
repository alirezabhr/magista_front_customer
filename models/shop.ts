import Preparation from '@/models/preparation_time'
import Shipping from '@/models/shipping/shipping'

class Shop {
    id: number
    instagramUsername: string
    province: string
    city: string
    profilePic: string
    bio: string
    delivery: Shipping
    preparation: Preparation

    constructor(id:number, igUsername: string, province: string, city: string, profilePic: string, bio: string,
        delivery: Shipping, preparation: number) {
        this.id = id
        this.instagramUsername = igUsername
        this.province = province
        this.city = city
        this.profilePic = profilePic
        this.bio = bio
        this.delivery = delivery
        this.preparation = preparation
    }

    toJSON() {
        return { ...this }
    }
}

export default Shop