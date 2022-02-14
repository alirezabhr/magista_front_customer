import Preparation from '@/models/preparation_time'

class Shop {
    id: number
    instagramUsername: string
    province: string
    city: string
    profileImageUrl: string
    bio: string
    delivery: number
    preparation: Preparation

    constructor(id:number, igUsername: string, province: string, city: string, profileUrl: string, bio: string,
        delivery: number, preparation: number) {
        this.id = id
        this.instagramUsername = igUsername
        this.province = province
        this.city = city
        this.profileImageUrl = profileUrl
        this.bio = bio
        this.delivery = delivery
        this.preparation = preparation
    }

    toJSON() {
        return { ...this }
    }
}

export default Shop