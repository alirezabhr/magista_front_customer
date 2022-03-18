import DeliveryPrice from './delivery_price'
import OccasionallyFreeDelivery from './occasionally_free_delivery'
import FreeDelivery from './free_delivery'

class Shipping {
  shop: number
  sendEverywhere: Boolean
  hasNationalPost: Boolean
  hasOnlineDelivery: Boolean
  cityCost: FreeDelivery
  countryCost: FreeDelivery
  nationalPost: DeliveryPrice | null
  onlineDelivery: DeliveryPrice | null
  cityFreeCostFrom: OccasionallyFreeDelivery | null
  countryFreeCostFrom: OccasionallyFreeDelivery | null

  constructor (shop:number, sendEverywhere: Boolean, hasNationalPost: Boolean, hasOnlineDelivery: Boolean,
    cityCost: number, countryCost: number, nationalPost: DeliveryPrice | null, onlineDelivery: DeliveryPrice | null,
    cityFreeCostFrom: OccasionallyFreeDelivery | null, countryFreeCostFrom: OccasionallyFreeDelivery | null) {
    this.shop = shop
    this.sendEverywhere = sendEverywhere
    this.hasNationalPost = hasNationalPost
    this.hasOnlineDelivery = hasOnlineDelivery
    this.cityCost = cityCost
    this.countryCost = countryCost
    this.nationalPost = nationalPost
    this.onlineDelivery = onlineDelivery
    this.cityFreeCostFrom = cityFreeCostFrom
    this.countryFreeCostFrom = countryFreeCostFrom
  }

  static jsonToInstance (jsonDelivery: any) : Shipping {
    return new Shipping(jsonDelivery.shop, jsonDelivery.sendEverywhere, jsonDelivery.hasNationalPost, jsonDelivery.hasOnlineDelivery,
      jsonDelivery.cityCost, jsonDelivery.countryCost, DeliveryPrice.jsonToInstance(jsonDelivery.nationalPost),
      DeliveryPrice.jsonToInstance(jsonDelivery.onlineDelivery), OccasionallyFreeDelivery.jsonToInstance(jsonDelivery.cityFreeCostFrom),
      OccasionallyFreeDelivery.jsonToInstance(jsonDelivery.countryFreeCostFrom))
  }
}

export default Shipping
