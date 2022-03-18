import AreaType from './area_type'

class OccasionallyFreeDelivery {
  shipment: number
  type: AreaType
  freeFrom: number

  constructor (shipment: number, type: number, freeFrom: number) {
    this.shipment = shipment
    this.type = type
    this.freeFrom = freeFrom
  }

  static jsonToInstance (jsonObject: any) : OccasionallyFreeDelivery | null {
    if (jsonObject == null) {
      return null
    }
    return new OccasionallyFreeDelivery(jsonObject.shipment, jsonObject.type, jsonObject.freeFrom)
  }
}

export default OccasionallyFreeDelivery
