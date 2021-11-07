class ShopInfo {
    instagramUsername: string
    province: string
    city: string
    profileImageUrl: string

    constructor(igUsername: string, province: string, city: string, profileUrl: string) {
        this.instagramUsername = igUsername
        this.province = province
        this.city = city
        this.profileImageUrl = profileUrl
    }

    toJSON() {
        return { ...this }
    }
}

export default ShopInfo